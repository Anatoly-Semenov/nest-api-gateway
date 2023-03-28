import { Body, Controller, Post } from '@nestjs/common';

// Dto
import { CreateUserDto } from '../user-service/dto';
import { RefreshTokenDto } from './dto';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Pattern } from './enums/pattern.enum';

@Controller('auth-service')
export class AuthServiceController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'auth-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(Pattern.LOGIN);
    this.client.subscribeToResponseOf(Pattern.REGISTRATION);
    this.client.subscribeToResponseOf(Pattern.REFRESH_TOKEN);

    await this.client.connect();
  }

  @Post('login')
  login(@Body() body: CreateUserDto) {
    return this.client.send(Pattern.LOGIN, body);
  }

  @Post('registration')
  registration(@Body() user: CreateUserDto) {
    return this.client.send(Pattern.REGISTRATION, user);
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.client.send(Pattern.REFRESH_TOKEN, body);
  }
}
