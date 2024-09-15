"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const Twilio = require("twilio");
const users_service_1 = require("../users/users.service");
let SmsService = class SmsService {
    constructor(userService) {
        this.userService = userService;
        this.client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
    async sendSms(phone, message) {
        try {
            const isRegistered = await this.userService.isUserRegistered(phone);
            if (!isRegistered) {
                return { success: false, message: 'Número de teléfono no registrado' };
            }
            const response = await this.client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone,
            });
            await this.userService.addMessageToUser(phone, {
                message,
                timestamp: admin.firestore.Timestamp.now(),
            });
            return { success: true, message: 'SMS enviado correctamente', response };
        }
        catch (error) {
            return { success: false, message: 'Error al enviar SMS', error };
        }
    }
};
exports.SmsService = SmsService;
exports.SmsService = SmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService])
], SmsService);
//# sourceMappingURL=sms.service.js.map