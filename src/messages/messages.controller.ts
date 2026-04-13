import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { MarkMessageStatusDto } from './dto/mark-message-status.dto';
import { SendDirectMessageDto } from './dto/send-direct-message.dto';
import { MessagesService } from './messages.service';

type AuthRequest = {
  user: { userId: number; email: string };
};

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('direct')
  sendDirect(@Req() req: AuthRequest, @Body() dto: SendDirectMessageDto) {
    return this.messagesService.sendDirectMessage(req.user.userId, dto);
  }

  @Get('direct/:userId')
  getConversation(
    @Req() req: AuthRequest,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.messagesService.getConversation(req.user.userId, userId);
  }

  @Get('inbox')
  getInbox(@Req() req: AuthRequest) {
    return this.messagesService.getInbox(req.user.userId);
  }

  @Patch(':id/status')
  updateStatus(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MarkMessageStatusDto,
  ) {
    return this.messagesService.updateStatus(req.user.userId, id, dto.status);
  }
}
