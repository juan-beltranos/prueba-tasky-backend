import { SmsService } from './sms.service';
export declare class SmsController {
    private readonly smsService;
    constructor(smsService: SmsService);
    sendSms(body: {
        phone: string;
        message: string;
    }): Promise<{
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
