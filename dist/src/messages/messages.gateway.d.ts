import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GroupsService } from '../groups/groups.service';
import { UsersService } from '../users/users.service';
import { MessagesService } from './messages.service';
type AuthSocket = Socket & {
    data: {
        userId?: number;
        email?: string;
        activePeerId?: number;
    };
};
export declare class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesService;
    private readonly groupsService;
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    server: Server;
    constructor(messagesService: MessagesService, groupsService: GroupsService, usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    handleConnection(client: AuthSocket): Promise<void>;
    handleDisconnect(client: AuthSocket): Promise<void>;
    handleSendMessage(client: AuthSocket, body: {
        receiverId: number;
        content: string;
        type?: string;
    }): Promise<{
        ok: boolean;
        error: string;
        message?: undefined;
    } | {
        ok: boolean;
        message: any;
        error?: undefined;
    }>;
    handleUpdateStatus(client: AuthSocket, body: {
        messageId: number;
        status: 'delivered' | 'read';
    }): Promise<{
        ok: boolean;
        error: string;
        message?: undefined;
    } | {
        ok: boolean;
        message: {
            sender: {
                id: number;
                name: string;
                email: string;
                profilePicture: string | null;
            };
            receiver: {
                id: number;
                name: string;
                email: string;
                profilePicture: string | null;
            } | null;
        } & {
            id: number;
            senderId: number;
            receiverId: number | null;
            groupId: number | null;
            content: string;
            type: string;
            status: string;
            createdAt: Date;
        };
        error?: undefined;
    }>;
    handleSendGroupMessage(client: AuthSocket, body: {
        groupId: number;
        content: string;
        type?: string;
    }): Promise<{
        ok: boolean;
        error: string;
        message?: undefined;
    } | {
        ok: boolean;
        message: {
            sender: {
                id: number;
                name: string;
                email: string;
                profilePicture: string | null;
            };
        } & {
            id: number;
            senderId: number;
            receiverId: number | null;
            groupId: number | null;
            content: string;
            type: string;
            status: string;
            createdAt: Date;
        };
        error?: undefined;
    }>;
    handleSetActiveChat(client: AuthSocket, body: {
        peerId: number;
    }): Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: boolean;
        error?: undefined;
    }>;
    handleCallStart(client: AuthSocket, body: {
        targetUserId: number;
        mode?: 'audio';
    }): Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: boolean;
        error?: undefined;
    }>;
    handleCallAccept(client: AuthSocket, body: {
        fromUserId: number;
    }): Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: boolean;
        error?: undefined;
    }>;
    handleCallReject(client: AuthSocket, body: {
        fromUserId: number;
    }): Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: boolean;
        error?: undefined;
    }>;
    handleCallOffer(client: AuthSocket, body: {
        toUserId: number;
        offer: Record<string, unknown>;
    }): Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: boolean;
        error?: undefined;
    }>;
    handleCallAnswer(client: AuthSocket, body: {
        toUserId: number;
        answer: Record<string, unknown>;
    }): Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: boolean;
        error?: undefined;
    }>;
    handleIceCandidate(client: AuthSocket, body: {
        toUserId: number;
        candidate: Record<string, unknown>;
    }): Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: boolean;
        error?: undefined;
    }>;
    handleCallEnd(client: AuthSocket, body: {
        toUserId: number;
    }): Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: boolean;
        error?: undefined;
    }>;
    private userRoom;
    private groupRoom;
    private extractToken;
}
export {};
