import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
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
    login(dto: LoginDto): Promise<{
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
}
