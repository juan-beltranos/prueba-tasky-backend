import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePictureFile'))
  async createUser(
    @Body() body: { name: string; phone: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = await this.userService.createUser({
      name: body.name,
      phone: body.phone,
      profilePictureFile: file,
    });

    return { message: 'User created successfully', userId };
  }

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get('messages')
  async getAllMessages() {
    const messages = await this.userService.getAllMessagesGroupedByUser();
    return messages;
  }
}
