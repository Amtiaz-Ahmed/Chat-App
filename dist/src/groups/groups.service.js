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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let GroupsService = class GroupsService {
    prisma;
    usersService;
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async createGroup(currentUserId, dto) {
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
    async getMyGroups(currentUserId) {
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
    async getGroupMessages(currentUserId, groupId) {
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
    async sendGroupMessage(currentUserId, groupId, dto) {
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
    async ensureMember(currentUserId, groupId) {
        const group = await this.prisma.group.findUnique({
            where: { id: groupId },
            include: {
                members: true,
            },
        });
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        const isMember = group.members.some((member) => member.userId === currentUserId);
        if (!isMember) {
            throw new common_1.ForbiddenException('You are not a member of this group');
        }
        return group;
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map