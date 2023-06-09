import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../types/jwt-payload.interface';
import { User } from '../../user-service/entities/user.entity';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Pattern } from '../../user-service/enums/pattern.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Todo: refactoring to .env
      secretOrKey: 'secret',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.client.send(Pattern.GET_USER, payload.user);

    if (!user) {
      throw new UnauthorizedException();
    }

    // @ts-ignore
    return user;
  }
}
