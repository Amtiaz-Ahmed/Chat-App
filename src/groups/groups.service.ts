import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { SendGroupMessageDto } from './dto/send-group-message.dto';

@Injectable()
export class GroupsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async createGroup(currentUserId: number, dto: CreateGroupDto) {
    const requestedMembers = dto.memberIds ?? [];
    const uniqueMemberIds = [...new Set([currentUserId, ...requestedMembers])];

    await Promise.all(uniqueMemberIds.map((id) => this.usersService.findById(id)));

    return this.prisma.group.create({
      data: {
        name: dto.name,
        createdBy: currentUserId,
        members: {
          create: uniqueMemberIds.map((userId) => ({
            userId,
            role: userId === currentUserId ? 'admin' : 'member',
          })),
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, profilePicture: true, status: true },
            },
          },
        },
      },
    });
  }

  async getMyGroups(currentUserId: number) {
    return this.prisma.group.findMany({
      where: {
        members: {
          some: { userId: currentUserId },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, profilePicture: true, status: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getGroupMessages(currentUserId: number, groupId: number) {
    await this.ensureMember(currentUserId, groupId);

    return this.prisma.message.findMany({
      where: { groupId, receiverId: null },
      include: {
        sender: {
          select: { id: true, name: true, email: true, profilePicture: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async sendGroupMessage(currentUserId: number, groupId: number, dto: SendGroupMessageDto) {
    await this.ensureMember(currentUserId, groupId);

    return this.prisma.message.create({
      data: {
        senderId: currentUserId,
        groupId,
        content: dto.content,
        type: dto.type ?? 'text',
        status: 'sent',
      },
      include: {
        sender: {
          select: { id: true, name: true, email: true, profilePicture: true },
        },
      },
    });
  }

  async ensureMember(currentUserId: number, groupId: number) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: true,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const isMember = group.members.some((member) => member.userId === currentUserId);
    if (!isMember) {
      throw new ForbiddenException('You are not a member of this group');
    }

    return group;
  }
}
