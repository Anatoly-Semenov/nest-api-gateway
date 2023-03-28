import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceController } from './auth-service.controller';

describe('AuthServiceController', () => {
  let controller: AuthServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthServiceController],
    }).compile();

    controller = module.get<AuthServiceController>(AuthServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
