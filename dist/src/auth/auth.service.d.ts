import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        user: {
            name: string;
            email: string;
            profilePicture: string | null;
            status: string;
            createdAt: Date;
            id: number;
        };
        accessToken: string;
    }>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        user: {
            name: string;
            email: string;
            profilePicture: string | null;
            status: string;
            createdAt: Date;
            id: number;
        };
        accessToken: string;
    }>;
    private signToken;
}
