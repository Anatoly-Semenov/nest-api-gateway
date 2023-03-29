import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service/auth-service.controller';
import { UserServiceController } from './user-service/user-service.controller';

@Module({
  imports: [],
  controllers: [AuthServiceController, UserServiceController],
  providers: [],
})
export class AppModule {}
