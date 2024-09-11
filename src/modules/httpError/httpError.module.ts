import { Module } from '@nestjs/common';
import { HttpErrorController } from './controllers/httpError.controller';
import { HttpErrorService } from './services/httpError.service';

@Module({
  controllers: [HttpErrorController],
  providers: [HttpErrorService],
  exports: [],
})
export class HttpErrorModule {}
