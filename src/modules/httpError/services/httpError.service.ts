import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getHttpStatusByCode } from 'src/utils/statusCodes';

@Injectable()
export class HttpErrorService {
  async getError(errorCode: string, timeout: string): Promise<void> {
    const code: number = parseInt(errorCode, 10);
    const t = parseInt(timeout, 10) || 0;

    if (Object.values(HttpStatus).includes(code)) {
      if (t > 0) {
        await this.#delay(t);
      }
      throw new HttpException(getHttpStatusByCode(code), code);
    }

    throw new HttpException(getHttpStatusByCode(404), HttpStatus.NOT_FOUND);
  }

  #delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
