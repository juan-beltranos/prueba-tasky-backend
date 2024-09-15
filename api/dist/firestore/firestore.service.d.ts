import * as admin from 'firebase-admin';
export declare class FirestoreService {
    constructor();
    getFirestore(): admin.firestore.Firestore;
    getStorage(): import("@google-cloud/storage").Bucket;
}
