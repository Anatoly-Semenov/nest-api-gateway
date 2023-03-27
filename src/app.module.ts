import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthServiceController } from './auth-service/auth-service.controller';
import { UserServiceController } from './user-service/user-service.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthServiceController, UserServiceController],
  providers: [AppService],
})
export class AppModule {}
