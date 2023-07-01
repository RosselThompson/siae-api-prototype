import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with database config based operations.
 *
 * @class
 */
@Injectable()
export class DbConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('db.name');
  }
  get port(): number {
    return Number(this.configService.get<number>('db.port'));
  }
  get username(): string {
    return this.configService.get<string>('db.username');
  }
  get pass(): string {
    return this.configService.get<string>('db.pass');
  }
  get name(): string {
    return this.configService.get<string>('db.name');
  }
}
