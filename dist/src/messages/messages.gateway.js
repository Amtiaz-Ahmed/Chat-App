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
exports.MessagesGateway = void 0;
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const groups_service_1 = require("../groups/groups.service");
const users_service_1 = require("../users/users.service");
const messages_service_1 = require("./messages.service");
let MessagesGateway = class MessagesGateway {
    messagesService;
    groupsService;
    usersService;
    jwtService;
    configService;
    server;
    constructor(messagesService, groupsService, usersService, jwtService, configService) {
        this.messagesService = messagesService;
        this.groupsService = groupsService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async handleConnection(client) {
        try {
            const token = this.extractToken(client);
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET') ?? 'change_me',
            });
            client.data.userId = payload.sub;
            client.data.email = payload.email;
            client.join(this.userRoom(payload.sub));
            await this.usersService.updateProfile(payload.sub, { status: 'online' });
            this.server.emit('presence:changed', { userId: payload.sub, status: 'online' });
            const groups = await this.groupsService.getMyGroups(payload.sub);
            for (const group of groups) {
                client.join(this.groupRoom(group.id));
            }
            client.emit('chat:connected', { userId: payload.sub });
        }
        catch {
            client.disconnect();
        }
    }
    async handleDisconnect(client) {
        if (!client.data.userId) {
            return;
        }
        const room = this.userRoom(client.data.userId);
        client.leave(room);
        const sockets = await this.server.in(room).fetchSockets();
        if (sockets.length === 0) {
            await this.usersService.updateProfile(client.data.userId, { status: 'offline' });
            this.server.emit('presence:changed', { userId: client.data.userId, status: 'offline' });
        }
    }
    async handleSendMessage(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        try {
            const receiverId = Number(body.receiverId);
            if (!Number.isInteger(receiverId)) {
                return { ok: false, error: 'receiverId must be a number' };
            }
            let message = await this.messagesService.sendDirectMessage(client.data.userId, {
                ...body,
                receiverId,
            });
            const receiverSockets = await this.server.in(this.userRoom(receiverId)).fetchSockets();
            if (receiverSockets.length > 0) {
                const shouldMarkRead = receiverSockets.some((socket) => Number(socket.data.activePeerId) === client.data.userId);
                message = await this.messagesService.autoUpdateStatus(message.id, shouldMarkRead ? 'read' : 'delivered');
            }
            this.server.to(this.userRoom(receiverId)).emit('message:new', message);
            this.server.to(this.userRoom(client.data.userId)).emit('message:new', message);
            return { ok: true, message };
        }
        catch (error) {
            return { ok: false, error: error.message };
        }
    }
    async handleUpdateStatus(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        try {
            const messageId = Number(body.messageId);
            if (!Number.isInteger(messageId)) {
                return { ok: false, error: 'messageId must be a number' };
            }
            const message = await this.messagesService.updateStatus(client.data.userId, messageId, body.status);
            this.server.to(this.userRoom(message.senderId)).emit('message:status:updated', message);
            this.server.to(this.userRoom(client.data.userId)).emit('message:status:updated', message);
            return { ok: true, message };
        }
        catch (error) {
            return { ok: false, error: error.message };
        }
    }
    async handleSendGroupMessage(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        try {
            const groupId = Number(body.groupId);
            if (!Number.isInteger(groupId)) {
                return { ok: false, error: 'groupId must be a number' };
            }
            const message = await this.groupsService.sendGroupMessage(client.data.userId, groupId, {
                content: body.content,
                type: body.type,
            });
            this.server.to(this.groupRoom(groupId)).emit('group:message:new', message);
            return { ok: true, message };
        }
        catch (error) {
            return { ok: false, error: error.message };
        }
    }
    async handleSetActiveChat(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        const peerId = Number(body.peerId);
        if (!Number.isInteger(peerId)) {
            return { ok: false, error: 'peerId must be a number' };
        }
        client.data.activePeerId = peerId;
        return { ok: true };
    }
    async handleCallStart(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        const targetUserId = Number(body.targetUserId);
        if (!Number.isInteger(targetUserId)) {
            return { ok: false, error: 'targetUserId must be a number' };
        }
        if (targetUserId === client.data.userId) {
            return { ok: false, error: 'Cannot call yourself' };
        }
        const targetSockets = await this.server.in(this.userRoom(targetUserId)).fetchSockets();
        if (targetSockets.length === 0) {
            return { ok: false, error: 'User is offline' };
        }
        this.server.to(this.userRoom(targetUserId)).emit('call:incoming', {
            fromUserId: client.data.userId,
            mode: body.mode ?? 'audio',
        });
        this.server.to(this.userRoom(client.data.userId)).emit('call:ringing', {
            targetUserId,
            mode: body.mode ?? 'audio',
        });
        return { ok: true };
    }
    async handleCallAccept(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        const fromUserId = Number(body.fromUserId);
        if (!Number.isInteger(fromUserId)) {
            return { ok: false, error: 'fromUserId must be a number' };
        }
        this.server.to(this.userRoom(fromUserId)).emit('call:accepted', {
            byUserId: client.data.userId,
        });
        return { ok: true };
    }
    async handleCallReject(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        const fromUserId = Number(body.fromUserId);
        if (!Number.isInteger(fromUserId)) {
            return { ok: false, error: 'fromUserId must be a number' };
        }
        this.server.to(this.userRoom(fromUserId)).emit('call:rejected', {
            byUserId: client.data.userId,
        });
        return { ok: true };
    }
    async handleCallOffer(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        this.server.to(this.userRoom(body.toUserId)).emit('call:offer', {
            fromUserId: client.data.userId,
            offer: body.offer,
        });
        return { ok: true };
    }
    async handleCallAnswer(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        this.server.to(this.userRoom(body.toUserId)).emit('call:answer', {
            fromUserId: client.data.userId,
            answer: body.answer,
        });
        return { ok: true };
    }
    async handleIceCandidate(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        this.server.to(this.userRoom(body.toUserId)).emit('call:ice-candidate', {
            fromUserId: client.data.userId,
            candidate: body.candidate,
        });
        return { ok: true };
    }
    async handleCallEnd(client, body) {
        if (!client.data.userId) {
            return { ok: false, error: 'Unauthorized' };
        }
        const toUserId = Number(body.toUserId);
        if (!Number.isInteger(toUserId)) {
            return { ok: false, error: 'toUserId must be a number' };
        }
        this.server.to(this.userRoom(toUserId)).emit('call:ended', {
            byUserId: client.data.userId,
        });
        return { ok: true };
    }
    userRoom(userId) {
        return `user:${userId}`;
    }
    groupRoom(groupId) {
        return `group:${groupId}`;
    }
    extractToken(client) {
        const authToken = client.handshake.auth?.token;
        if (typeof authToken === 'string' && authToken.trim().length > 0) {
            return authToken;
        }
        const header = client.handshake.headers.authorization;
        if (typeof header === 'string' && header.startsWith('Bearer ')) {
            return header.slice(7);
        }
        return null;
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message:send'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message:status:update'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleUpdateStatus", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('group:message:send'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleSendGroupMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat:active'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleSetActiveChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:start'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleCallStart", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:accept'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleCallAccept", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:reject'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleCallReject", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:offer'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleCallOffer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:answer'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleCallAnswer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:ice-candidate'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleIceCandidate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:end'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleCallEnd", null);
exports.MessagesGateway = MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
    }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        groups_service_1.GroupsService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map