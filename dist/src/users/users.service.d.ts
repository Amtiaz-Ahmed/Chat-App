import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        name: string;
        email: string;
        password: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    }>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        password: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    } | null>;
    findById(id: number): Promise<{
        name: string;
        email: string;
        password: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    }>;
    listPublicUsers(currentUserId: number): Promise<{
        name: string;
        email: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    }[]>;
    updateProfile(id: number, data: {
        name?: string;
        profilePicture?: string;
        status?: string;
        password?: string;
    }): Promise<{
        name: string;
        email: string;
        password: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    }>;
}
