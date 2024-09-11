import { Module } from '@nestjs/common';
import { HttpErrorModule } from './modules/httpError/httpError.module';

@Module({
  imports: [HttpErrorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
