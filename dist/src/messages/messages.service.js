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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let MessagesService = class MessagesService {
    prisma;
    usersService;
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async sendDirectMessage(senderId, dto) {
        if (senderId === dto.receiverId) {
            throw new common_1.BadRequestException('You cannot send a message to yourself');
        }
        await this.usersService.findById(dto.receiverId);
        return this.prisma.message.create({
            data: {
                senderId,
                receiverId: dto.receiverId,
                content: dto.content,
                type: dto.type ?? 'text',
                status: 'sent',
            },
            include: {
                sender: {
                    select: { id: true, name: true, email: true, profilePicture: true },
                },
                receiver: {
                    select: { id: true, name: true, email: true, profilePicture: true },
                },
            },
        });
    }
    async getConversation(currentUserId, otherUserId) {
        await this.usersService.findById(otherUserId);
        return this.prisma.message.findMany({
            where: {
                groupId: null,
                OR: [
                    { senderId: currentUserId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: currentUserId },
                ],
            },
            include: {
                sender: {
                    select: { id: true, name: true, email: true, profilePicture: true },
                },
                receiver: {
                    select: { id: true, name: true, email: true, profilePicture: true },
                },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async getInbox(currentUserId) {
        const messages = await this.prisma.message.findMany({
            where: {
                groupId: null,
                OR: [{ senderId: currentUserId }, { receiverId: currentUserId }],
            },
            include: {
                sender: {
                    select: { id: true, name: true, email: true, profilePicture: true },
                },
                receiver: {
                    select: { id: true, name: true, email: true, profilePicture: true },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: 500,
        });
        const latestByUser = new Map();
        for (const message of messages) {
            const otherUserId = message.senderId === currentUserId ? message.receiverId : message.senderId;
            if (!otherUserId || latestByUser.has(otherUserId)) {
                continue;
            }
            latestByUser.set(otherUserId, message);
        }
        return Array.from(latestByUser.values());
    }
    async updateStatus(currentUserId, messageId, status) {
        const message = await this.prisma.message.findUnique({
            where: { id: messageId },
        });
        if (!message || !message.receiverId || message.groupId) {
            throw new common_1.NotFoundException('Message not found');
        }
        if (message.receiverId !== currentUserId) {
            throw new common_1.ForbiddenException('You can only update your received messages');
        }
        return this.prisma.message.update({
            where: { id: messageId },
            data: { status },
            include: {
                sender: {
                    select: { id: true, name: true, email: true, profilePicture: true },
                },
                receiver: {
                    select: { id: true, name: true, email: true, profilePicture: true },
                },
            },
        });
    }
    async autoUpdateStatus(messageId, status) {
        const message = await this.prisma.message.findUnique({
            where: { id: messageId },
        });
        if (!message || !message.receiverId || message.groupId) {
            throw new common_1.NotFoundException('Message not found');
        }
        const rank = {
            sent: 0,
            delivered: 1,
            read: 2,
        };
        if (rank[status] <= (rank[message.status] ?? 0)) {
            return this.prisma.message.findUniqueOrThrow({
                where: { id: messageId },
                include: {
                    sender: {
                        select: { id: true, name: true, email: true, profilePicture: true },
                    },
                    receiver: {
                        select: { id: true, name: true, email: true, profilePicture: true },
                    },
                },
            });
        }
        return this.prisma.message.update({
            where: { id: messageId },
            data: { status },
            include: {
                sender: {
                    select: { id: true, name: true, email: true, profilePicture: true },
                },
                receiver: {
                    select: { id: true, name: true, email: true, profilePicture: true },
                },
            },
        });
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map