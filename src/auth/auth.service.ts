import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      name: data.name,
      email: data.email,
      password: hashed,
    });

    const token = await this.signToken(user.id, user.email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = user;
    return { user: safe, accessToken: token };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    let match = await bcrypt.compare(data.password, user.password);

    // Backward compatibility for old users saved with plain-text passwords.
    // On first successful login, upgrade stored password to bcrypt hash.
    if (!match && user.password === data.password) {
      const upgradedHash = await bcrypt.hash(data.password, 10);
      await this.usersService.updateProfile(user.id, { password: upgradedHash });
      match = true;
    }

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.signToken(user.id, user.email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = user;
    return { user: safe, accessToken: token };
  }

  private async signToken(userId: number, email: string) {
    return this.jwtService.signAsync({ sub: userId, email });
  }
}
