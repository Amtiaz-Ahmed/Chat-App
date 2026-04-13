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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const mark_message_status_dto_1 = require("./dto/mark-message-status.dto");
const send_direct_message_dto_1 = require("./dto/send-direct-message.dto");
const messages_service_1 = require("./messages.service");
let MessagesController = class MessagesController {
    messagesService;
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    sendDirect(req, dto) {
        return this.messagesService.sendDirectMessage(req.user.userId, dto);
    }
    getConversation(req, userId) {
        return this.messagesService.getConversation(req.user.userId, userId);
    }
    getInbox(req) {
        return this.messagesService.getInbox(req.user.userId);
    }
    updateStatus(req, id, dto) {
        return this.messagesService.updateStatus(req.user.userId, id, dto.status);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Post)('direct'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, send_direct_message_dto_1.SendDirectMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "sendDirect", null);
__decorate([
    (0, common_1.Get)('direct/:userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Get)('inbox'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "getInbox", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, mark_message_status_dto_1.MarkMessageStatusDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "updateStatus", null);
exports.MessagesController = MessagesController = __decorate([
    (0, common_1.Controller)('messages'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map