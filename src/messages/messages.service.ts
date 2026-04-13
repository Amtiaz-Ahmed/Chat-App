import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SendDirectMessageDto } from './dto/send-direct-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async sendDirectMessage(senderId: number, dto: SendDirectMessageDto) {
    if (senderId === dto.receiverId) {
      throw new BadRequestException('You cannot send a message to yourself');
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

  async getConversation(currentUserId: number, otherUserId: number) {
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

  async getInbox(currentUserId: number) {
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

    const latestByUser = new Map<number, (typeof messages)[number]>();

    for (const message of messages) {
      const otherUserId =
        message.senderId === currentUserId ? message.receiverId : message.senderId;

      if (!otherUserId || latestByUser.has(otherUserId)) {
        continue;
      }

      latestByUser.set(otherUserId, message);
    }

    return Array.from(latestByUser.values());
  }

  async updateStatus(
    currentUserId: number,
    messageId: number,
    status: 'delivered' | 'read',
  ) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message || !message.receiverId || message.groupId) {
      throw new NotFoundException('Message not found');
    }

    if (message.receiverId !== currentUserId) {
      throw new ForbiddenException('You can only update your received messages');
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

  async autoUpdateStatus(messageId: number, status: 'delivered' | 'read') {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message || !message.receiverId || message.groupId) {
      throw new NotFoundException('Message not found');
    }

    const rank: Record<string, number> = {
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
}
