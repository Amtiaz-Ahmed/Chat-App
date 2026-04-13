import { CreateGroupDto } from './dto/create-group.dto';
import { SendGroupMessageDto } from './dto/send-group-message.dto';
import { GroupsService } from './groups.service';
type AuthRequest = {
    user: {
        userId: number;
        email: string;
    };
};
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    createGroup(req: AuthRequest, dto: CreateGroupDto): Promise<{
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
    getMyGroups(req: AuthRequest): Promise<({
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
    getGroupMessages(req: AuthRequest, id: number): Promise<({
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
    sendGroupMessage(req: AuthRequest, id: number, dto: SendGroupMessageDto): Promise<{
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
}
export {};
