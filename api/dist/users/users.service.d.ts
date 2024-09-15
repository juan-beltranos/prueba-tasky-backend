import { FirestoreService } from '../firestore/firestore.service';
import * as admin from 'firebase-admin';
export declare class UserService {
    private firestoreService;
    private firestore;
    private storageBucket;
    constructor(firestoreService: FirestoreService);
    uploadProfilePicture(file: Express.Multer.File): Promise<unknown>;
    createUser(data: {
        name: string;
        phone: string;
        profilePictureFile: Express.Multer.File;
    }): Promise<any>;
    getUsers(): Promise<any>;
    isUserRegistered(phone: string): Promise<boolean>;
    addMessageToUser(phone: string, messageData: {
        message: string;
        timestamp: admin.firestore.Timestamp;
    }): Promise<void>;
    getAllMessagesGroupedByUser(): Promise<Record<string, {
        name: string;
        phone: string;
        messages: {
            message: string;
            timestamp: admin.firestore.Timestamp;
        }[];
    }>>;
}
