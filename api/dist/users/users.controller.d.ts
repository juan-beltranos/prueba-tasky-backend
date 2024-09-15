import { UserService } from './users.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(body: {
        name: string;
        phone: string;
    }, file: Express.Multer.File): Promise<{
        message: string;
        userId: any;
    }>;
    getUsers(): Promise<any>;
    getAllMessages(): Promise<Record<string, {
        name: string;
        phone: string;
        messages: {
            message: string;
            timestamp: FirebaseFirestore.Timestamp;
        }[];
    }>>;
}
