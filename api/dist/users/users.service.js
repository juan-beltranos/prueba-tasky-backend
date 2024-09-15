"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const firestore_service_1 = require("../firestore/firestore.service");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(firestoreService) {
        this.firestoreService = firestoreService;
        this.firestore = this.firestoreService.getFirestore();
        this.storageBucket = this.firestoreService.getStorage();
    }
    async uploadProfilePicture(file) {
        const fileName = `${(0, uuid_1.v4)()}_${file.originalname}`;
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
    async createUser(data) {
        const profilePictureUrl = await this.uploadProfilePicture(data.profilePictureFile);
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
    async isUserRegistered(phone) {
        const usersCollection = this.firestore.collection('users');
        const snapshot = await usersCollection.where('phone', '==', phone).get();
        return !snapshot.empty;
    }
    async addMessageToUser(phone, messageData) {
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
        const usersMessages = {};
        for (const userDoc of usersSnapshot.docs) {
            const userData = userDoc.data();
            const messagesCollection = userDoc.ref.collection('messages');
            const messagesSnapshot = await messagesCollection.get();
            const messages = messagesSnapshot.docs.map(doc => ({
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firestore_service_1.FirestoreService])
], UserService);
//# sourceMappingURL=users.service.js.map