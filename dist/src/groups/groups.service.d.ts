import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { SendGroupMessageDto } from './dto/send-group-message.dto';
export declare class GroupsService {
    private readonly prisma;
    private readonly usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    createGroup(currentUserId: number, dto: CreateGroupDto): Promise<{
        members: ({
            user: {
                id: number;
                name: string;
                email: string;
                profilePicture: string | null;
                status: string;
            };
        } & {
            role: string;
            userId: number;
            groupId: number;
        })[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        createdBy: number;
    }>;
    getMyGroups(currentUserId: number): Promise<({
        members: ({
            user: {
                id: number;
                name: string;
                email: string;
                profilePicture: string | null;
                status: string;
            };
        } & {
            role: string;
            userId: number;
            groupId: number;
        })[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        createdBy: number;
    })[]>;
    getGroupMessages(currentUserId: number, groupId: number): Promise<({
        sender: {
            id: number;
            name: string;
            email: string;
            profilePicture: string | null;
        };
    } & {
        id: number;
        status: string;
        createdAt: Date;
        groupId: number | null;
        senderId: number;
        receiverId: number | null;
        content: string;
        type: string;
    })[]>;
    sendGroupMessage(currentUserId: number, groupId: number, dto: SendGroupMessageDto): Promise<{
        sender: {
            id: number;
            name: string;
            email: string;
            profilePicture: string | null;
        };
    } & {
        id: number;
        status: string;
        createdAt: Date;
        groupId: number | null;
        senderId: number;
        receiverId: number | null;
        content: string;
        type: string;
    }>;
    ensureMember(currentUserId: number, groupId: number): Promise<{
        members: {
            role: string;
            userId: number;
            groupId: number;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        createdBy: number;
    }>;
}
