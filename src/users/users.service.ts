import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    console.log(email,"email")
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async listPublicUsers(currentUserId: number) {
    return this.prisma.user.findMany({
      where: { id: { not: currentUserId } },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        status: true,
        createdAt: true,
      },
      orderBy: [{ status: 'desc' }, { name: 'asc' }],
    });
  }

  async updateProfile(
    id: number,
    data: { name?: string; profilePicture?: string; status?: string; password?: string },
  ) {
    await this.findById(id);
    return this.prisma.user.update({ where: { id }, data });
  }
}
