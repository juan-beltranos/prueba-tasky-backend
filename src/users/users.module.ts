import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { FirestoreModule } from '../firestore/firestore.module';

@Module({
    imports: [FirestoreModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UsersModule { } 
