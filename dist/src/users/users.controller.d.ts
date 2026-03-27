import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    profile(req: {
        user: {
            userId: number;
            email: string;
        };
    }): Promise<{
        email: string;
        name: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    }>;
    updateProfile(req: {
        user: {
            userId: number;
            email: string;
        };
    }, dto: UpdateProfileDto): Promise<{
        email: string;
        name: string;
        profilePicture: string | null;
        status: string;
        createdAt: Date;
        id: number;
    }>;
}
