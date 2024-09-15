import { UserService } from '../users/users.service';
export declare class SmsService {
    private userService;
    private client;
    constructor(userService: UserService);
    sendSms(phone: string, message: string): Promise<{
        success: boolean;
        message: string;
        response?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        response: import("twilio/lib/rest/api/v2010/account/message").MessageInstance;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        response?: undefined;
    }>;
}
