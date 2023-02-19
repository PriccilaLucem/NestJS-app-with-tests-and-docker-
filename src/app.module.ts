import { Module } from '@nestjs/common';
import { VerifyController } from './verify/verify.controller';
@Module({
  imports: [],
  controllers: [VerifyController],
  providers: [],
})
export class AppModule {}
