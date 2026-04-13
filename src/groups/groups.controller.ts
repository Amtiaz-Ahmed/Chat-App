import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { SendGroupMessageDto } from './dto/send-group-message.dto';
import { GroupsService } from './groups.service';

type AuthRequest = {
  user: { userId: number; email: string };
};

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  createGroup(@Req() req: AuthRequest, @Body() dto: CreateGroupDto) {
    return this.groupsService.createGroup(req.user.userId, dto);
  }

  @Get()
  getMyGroups(@Req() req: AuthRequest) {
    return this.groupsService.getMyGroups(req.user.userId);
  }

  @Get(':id/messages')
  getGroupMessages(@Req() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    return this.groupsService.getGroupMessages(req.user.userId, id);
  }

  @Post(':id/messages')
  sendGroupMessage(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SendGroupMessageDto,
  ) {
    return this.groupsService.sendGroupMessage(req.user.userId, id, dto);
  }
}
