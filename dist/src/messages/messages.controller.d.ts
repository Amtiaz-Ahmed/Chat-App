import { MarkMessageStatusDto } from './dto/mark-message-status.dto';
import { SendDirectMessageDto } from './dto/send-direct-message.dto';
import { MessagesService } from './messages.service';
type AuthRequest = {
    user: {
        userId: number;
        email: string;
    };
};
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    sendDirect(req: AuthRequest, dto: SendDirectMessageDto): Promise<{
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
    getConversation(req: AuthRequest, userId: number): Promise<({
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
    getInbox(req: AuthRequest): Promise<({
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
    updateStatus(req: AuthRequest, id: number, dto: MarkMessageStatusDto): Promise<{
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
export {};
