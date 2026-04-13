import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(req: {
        user: {
            userId: number;
            email: string;
        };
    }): Promise<{
        id: number;
        name: string;
        email: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
    }[]>;
    profile(req: {
        user: {
            userId: number;
            email: string;
        };
    }): Promise<{
        id: number;
        name: string;
        email: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
    }>;
    updateProfile(req: {
        user: {
            userId: number;
            email: string;
        };
    }, dto: UpdateProfileDto): Promise<{
        id: number;
        name: string;
        email: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
    }>;
}
