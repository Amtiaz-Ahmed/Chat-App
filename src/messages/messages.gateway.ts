import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GroupsService } from '../groups/groups.service';
import { UsersService } from '../users/users.service';
import { MessagesService } from './messages.service';

type AuthSocket = Socket & { data: { userId?: number; email?: string; activePeerId?: number } };

@WebSocketGateway({
  cors: { origin: '*' },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly groupsService: GroupsService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handleConnection(client: AuthSocket) {
    try {
      const token = this.extractToken(client);
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync<{ sub: number; email: string }>(token, {
        secret: this.configService.get<string>('JWT_SECRET') ?? 'change_me',
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
    } catch {
      client.disconnect();
    }
  }

  async handleDisconnect(client: AuthSocket) {
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

  @SubscribeMessage('message:send')
  async handleSendMessage(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { receiverId: number; content: string; type?: string },
  ) {
    if (!client.data.userId) {
      return { ok: false, error: 'Unauthorized' };
    }

    try {
      const receiverId = Number(body.receiverId);
      if (!Number.isInteger(receiverId)) {
        return { ok: false, error: 'receiverId must be a number' };
      }

      let message: any = await this.messagesService.sendDirectMessage(client.data.userId, {
        ...body,
        receiverId,
      });

      const receiverSockets = await this.server.in(this.userRoom(receiverId)).fetchSockets();
      if (receiverSockets.length > 0) {
        const shouldMarkRead = receiverSockets.some(
          (socket) => Number((socket.data as { activePeerId?: number }).activePeerId) === client.data.userId,
        );
        message = await this.messagesService.autoUpdateStatus(
          message.id,
          shouldMarkRead ? 'read' : 'delivered',
        );
      }

      this.server.to(this.userRoom(receiverId)).emit('message:new', message);
      this.server.to(this.userRoom(client.data.userId)).emit('message:new', message);

      return { ok: true, message };
    } catch (error) {
      return { ok: false, error: (error as Error).message };
    }
  }

  @SubscribeMessage('message:status:update')
  async handleUpdateStatus(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { messageId: number; status: 'delivered' | 'read' },
  ) {
    if (!client.data.userId) {
      return { ok: false, error: 'Unauthorized' };
    }

    try {
      const messageId = Number(body.messageId);
      if (!Number.isInteger(messageId)) {
        return { ok: false, error: 'messageId must be a number' };
      }

      const message = await this.messagesService.updateStatus(
        client.data.userId,
        messageId,
        body.status,
      );

      this.server.to(this.userRoom(message.senderId)).emit('message:status:updated', message);
      this.server.to(this.userRoom(client.data.userId)).emit('message:status:updated', message);

      return { ok: true, message };
    } catch (error) {
      return { ok: false, error: (error as Error).message };
    }
  }

  @SubscribeMessage('group:message:send')
  async handleSendGroupMessage(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { groupId: number; content: string; type?: string },
  ) {
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
    } catch (error) {
      return { ok: false, error: (error as Error).message };
    }
  }

  @SubscribeMessage('chat:active')
  async handleSetActiveChat(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { peerId: number },
  ) {
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

  @SubscribeMessage('call:start')
  async handleCallStart(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { targetUserId: number; mode?: 'audio' },
  ) {
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

  @SubscribeMessage('call:accept')
  async handleCallAccept(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { fromUserId: number },
  ) {
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

  @SubscribeMessage('call:reject')
  async handleCallReject(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { fromUserId: number },
  ) {
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

  @SubscribeMessage('call:offer')
  async handleCallOffer(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { toUserId: number; offer: Record<string, unknown> },
  ) {
    if (!client.data.userId) {
      return { ok: false, error: 'Unauthorized' };
    }
    this.server.to(this.userRoom(body.toUserId)).emit('call:offer', {
      fromUserId: client.data.userId,
      offer: body.offer,
    });
    return { ok: true };
  }

  @SubscribeMessage('call:answer')
  async handleCallAnswer(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { toUserId: number; answer: Record<string, unknown> },
  ) {
    if (!client.data.userId) {
      return { ok: false, error: 'Unauthorized' };
    }
    this.server.to(this.userRoom(body.toUserId)).emit('call:answer', {
      fromUserId: client.data.userId,
      answer: body.answer,
    });
    return { ok: true };
  }

  @SubscribeMessage('call:ice-candidate')
  async handleIceCandidate(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { toUserId: number; candidate: Record<string, unknown> },
  ) {
    if (!client.data.userId) {
      return { ok: false, error: 'Unauthorized' };
    }
    this.server.to(this.userRoom(body.toUserId)).emit('call:ice-candidate', {
      fromUserId: client.data.userId,
      candidate: body.candidate,
    });
    return { ok: true };
  }

  @SubscribeMessage('call:end')
  async handleCallEnd(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() body: { toUserId: number },
  ) {
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

  private userRoom(userId: number) {
    return `user:${userId}`;
  }

  private groupRoom(groupId: number) {
    return `group:${groupId}`;
  }

  private extractToken(client: Socket) {
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
}
