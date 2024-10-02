import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getHttpStatusByCode } from 'src/utils/statusCodes';

@Injectable()
export class HttpErrorService {
  async getError(errorCode: string, query: Record<string, any>): Promise<void> {
    const code: number = parseInt(errorCode, 10);
    const t = parseInt(query.timeout, 10);
    delete query.timeout;

    if (Object.values(HttpStatus).includes(code)) {
      if (t > 0) {
        await this.#delay(t);
      }
      throw new HttpException(
        {
          statusCode: code,
          statusText: getHttpStatusByCode(code),
          ...query,
        },
        code,
      );
    }

    throw new HttpException(getHttpStatusByCode(404), HttpStatus.NOT_FOUND);
  }

  #delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
