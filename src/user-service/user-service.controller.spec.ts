import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceController } from './user-service.controller';

describe('UserServiceController', () => {
  let controller: UserServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserServiceController],
    }).compile();

    controller = module.get<UserServiceController>(UserServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
