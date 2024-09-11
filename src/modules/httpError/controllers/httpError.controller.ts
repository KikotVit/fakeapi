import { Controller, Get, Param, Query } from '@nestjs/common';
import { HttpErrorService } from '../services/httpError.service';

@Controller()
export class HttpErrorController {
  constructor(private readonly appService: HttpErrorService) {}

  @Get('/httpError/:errorCode?')
  async getError(
    @Param('errorCode') errorCode: string,
    @Query('timeout') timeout: string,
  ): Promise<void> {
    const code = errorCode || '404';
    return await this.appService.getError(code, timeout);
  }
}
