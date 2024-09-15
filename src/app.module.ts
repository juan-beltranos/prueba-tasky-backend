import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module'; 
import { SmsModule } from './sms/sms.module';
import { FirestoreModule } from './firestore/firestore.module'; 

@Module({
  imports: [UsersModule, SmsModule, FirestoreModule], 
 
})
export class AppModule { }