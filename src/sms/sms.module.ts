import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { UsersModule } from '../users/users.module';  

@Module({
    imports: [UsersModule], 
    providers: [SmsService],
    controllers: [SmsController],
})
export class SmsModule { }