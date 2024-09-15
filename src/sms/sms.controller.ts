import { Controller, Post, Body } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) { }

    @Post('send')
    async sendSms(@Body() body: { phone: string; message: string }) {
        const { phone, message } = body;
        return this.smsService.sendSms(phone, message);
    }
}