import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getHttpStatusByCode } from 'src/utils/statusCodes';

@Injectable()
export class HttpErrorService {
  async getError(
    errorCode: string,
    timeout: string,
    errorMessage: string,
    statusText: string,
  ): Promise<void> {
    const code: number = parseInt(errorCode, 10);
    const t = parseInt(timeout, 10) || 0;

    if (Object.values(HttpStatus).includes(code)) {
      const responseBody: Record<string, any> = {
        status: code,
        statusText: statusText ?? getHttpStatusByCode(code),
        ok: code === 200,
      };
      if (errorMessage) {
        responseBody.errorMessage = errorMessage;
      }
      if (t > 0) {
        await this.#delay(t);
      }
      throw new HttpException(responseBody, code);
    }

    throw new HttpException(getHttpStatusByCode(404), HttpStatus.NOT_FOUND);
  }

  #delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
