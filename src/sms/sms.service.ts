import { Injectable } from '@nestjs/common';

import * as admin from 'firebase-admin';
import * as Twilio from 'twilio';

import { UserService } from '../users/users.service';

@Injectable()
export class SmsService {
  private client: Twilio.Twilio;

  constructor(private userService: UserService) {
    this.client = Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendSms(phone: string, message: string) {
    try {
      // Verifica si el usuario está registrado
      const isRegistered = await this.userService.isUserRegistered(phone);
      if (!isRegistered) {
        return { success: false, message: 'Número de teléfono no registrado' };
      }

      // Verificar el número total de mensajes enviados (en la colección 'sms')
      const totalMessagesSent = await this.userService.getTotalSmsCount();
      if (totalMessagesSent >= 5) {
        return { success: false, message: 'Límite de 5 mensajes alcanzado, debe pagar un plan.' };
      }

      // Enviar el mensaje usando Twilio
      const response = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

      // Guardar el mensaje en la colección 'sms'
      await this.userService.addMessageToSmsCollection({
        phone,
        message,
        timestamp: admin.firestore.Timestamp.now(),
      });

      // Guardar el mensaje en la subcolección del usuario
      await this.userService.addMessageToUser(phone, {
        message,
        timestamp: admin.firestore.Timestamp.now(),
      });

      return { success: true, message: 'SMS enviado correctamente', response };
    } catch (error) {
      return { success: false, message: 'Error al enviar SMS', error };
    }
  }

}
