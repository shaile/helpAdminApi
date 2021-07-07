import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Welome to the Azure App ! ${process.env.MONGODB_URI}`;
  }
}
