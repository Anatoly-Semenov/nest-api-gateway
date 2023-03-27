import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth-service/guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { UpdateUserDto } from './dto';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Pattern } from './enums/pattern.enum';

@Controller('user-service')
export class UserServiceController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(Pattern.GET_USERS);
    this.client.subscribeToResponseOf(Pattern.GET_MY_USER);
    this.client.subscribeToResponseOf(Pattern.GET_USER);
    this.client.subscribeToResponseOf(Pattern.UPDATE_USER);
    this.client.subscribeToResponseOf(Pattern.UPDATE_USER);

    await this.client.connect();
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.client.send(Pattern.GET_USERS, '');
  }

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  findMe(@GetUser() user) {
    return this.client.send(Pattern.GET_MY_USER, user);
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.client.send(Pattern.GET_USER, id);
  }

  @Patch('users/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.client.send(Pattern.UPDATE_USER, {
      id,
      UpdateUserDto,
    });
  }

  @Delete('users/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.client.send(Pattern.UPDATE_USER, id);
  }
}
