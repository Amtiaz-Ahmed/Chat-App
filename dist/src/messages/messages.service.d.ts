import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SendDirectMessageDto } from './dto/send-direct-message.dto';
export declare class MessagesService {
    private readonly prisma;
    private readonly usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    sendDirectMessage(senderId: number, dto: SendDirectMessageDto): Promise<{
        sender: {
            name: string;
            email: string;
            profilePicture: string | null;
            id: number;
        };
        receiver: {
            name: string;
            email: string;
            profilePicture: string | null;
            id: number;
        } | null;
    } & {
        status: string;
        createdAt: Date;
        id: number;
        senderId: number;
        receiverId: number | null;
        groupId: number | null;
        content: string;
        type: string;
    }>;
    getConversation(currentUserId: number, otherUserId: number): Promise<({
        sender: {
            name: string;
            email: string;
            profilePicture: string | null;
            id: number;
        };
        receiver: {
            name: string;
            email: string;
            profilePicture: string | null;
            id: number;
        } | null;
    } & {
        status: string;
        createdAt: Date;
        id: number;
        senderId: number;
        receiverId: number | null;
        groupId: number | null;
        content: string;
        type: string;
    })[]>;
    getInbox(currentUserId: number): Promise<({
        sender: {
            name: string;
            email: string;
            profilePicture: string | null;
            id: number;
        };
        receiver: {
            name: string;
            email: string;
            profilePicture: string | null;
            id: number;
        } | null;
    } & {
        status: string;
        createdAt: Date;
        id: number;
        senderId: number;
        receiverId: number | null;
        groupId: number | null;
        content: string;
        type: string;
    })[]>;
    updateStatus(currentUserId: number, messageId: number, status: 'delivered' | 'read'): Promise<{
        sender: {
            name: string;
            email: string;
            profilePicture: string | null;
            id: number;
        };
        receiver: {
            name: string;
            email: string;
            profilePicture: string | null;
            id: number;
        } | null;
    } & {
        status: string;
        createdAt: Date;
        id: number;
        senderId: number;
        receiverId: number | null;
        groupId: number | null;
        content: string;
        type: string;
    }>;
    autoUpdateStatus(messageId: number, status: 'delivered' | 'read'): Promise<{
        sender: {
            name: string;
            email: string;
            profilePicture: string | null;
            id: number;
        };
        receiver: {
            name: string;
            email: string;
            profilePicture: string | null;
            id: number;
        } | null;
    } & {
        status: string;
        createdAt: Date;
        id: number;
        senderId: number;
        receiverId: number | null;
        groupId: number | null;
        content: string;
        type: string;
    }>;
}
