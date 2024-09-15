import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../firestore/firestore.service';
import { v4 as uuidv4 } from 'uuid';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  private firestore;
  private storageBucket;

  constructor(private firestoreService: FirestoreService) {
    this.firestore = this.firestoreService.getFirestore();
    this.storageBucket = this.firestoreService.getStorage();
  }

  async uploadProfilePicture(file: Express.Multer.File) {
    const fileName = `${uuidv4()}_${file.originalname}`;
    const fileUpload = this.storageBucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        await fileUpload.makePublic();
        const fileUrl = `https://storage.googleapis.com/${this.storageBucket.name}/${fileName}`;
        resolve(fileUrl);
      });

      stream.end(file.buffer);
    });
  }

  async createUser(data: {
    name: string;
    phone: string;
    profilePictureFile: Express.Multer.File;
  }) {
    const profilePictureUrl = await this.uploadProfilePicture(
      data.profilePictureFile,
    );
    const usersCollection = this.firestore.collection('users');

    const cleanedPhone = data.phone.replace(/\s+/g, '');

    const userRef = await usersCollection.add({
      name: data.name,
      phone: `+57${cleanedPhone}`,
      profilePicture: profilePictureUrl,
    });
    return userRef.id;
  }

  async getUsers() {
    const usersCollection = this.firestore.collection('users');
    const snapshot = await usersCollection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async isUserRegistered(phone: string): Promise<boolean> {
    const usersCollection = this.firestore.collection('users');
    const snapshot = await usersCollection.where('phone', '==', phone).get();
    return !snapshot.empty;
  }

  async addMessageToUser(
    phone: string,
    messageData: { message: string; timestamp: admin.firestore.Timestamp },
  ) {
    const usersCollection = this.firestore.collection('users');
    const snapshot = await usersCollection.where('phone', '==', phone).get();

    if (snapshot.empty) {
      throw new Error('User not found');
    }

    const userDoc = snapshot.docs[0].ref;
    const messagesCollection = userDoc.collection('messages');

    await messagesCollection.add(messageData);
  }

  async getAllMessagesGroupedByUser() {
    const usersCollection = this.firestore.collection('users');
    const usersSnapshot = await usersCollection.get();

    if (usersSnapshot.empty) {
      throw new Error('No users found');
    }

    const usersMessages: Record<
      string,
      {
        name: string;
        phone: string;
        messages: { message: string; timestamp: admin.firestore.Timestamp }[];
      }
    > = {};

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const messagesCollection = userDoc.ref.collection('messages');
      const messagesSnapshot = await messagesCollection.get();

      const messages = messagesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
      }));

      usersMessages[userData.phone] = {
        name: userData.name,
        phone: userData.phone,
        messages: messages,
      };
    }

    return usersMessages;
  }

  async addMessageToSmsCollection(smsData: {
    phone: string;
    message: string;
    timestamp: admin.firestore.Timestamp;
  }) {
    await this.firestore.collection('sms').add(smsData);
  }
}
