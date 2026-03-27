import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        email: string;
        password: string;
        name: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        password: string;
        name: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    } | null>;
    findById(id: number): Promise<{
        email: string;
        password: string;
        name: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    }>;
    updateProfile(id: number, data: {
        name?: string;
        profilePicture?: string;
        status?: string;
    }): Promise<{
        email: string;
        password: string;
        name: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    }>;
}
