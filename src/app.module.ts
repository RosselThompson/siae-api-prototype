import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/app/config.module';
import { DbConfigModule } from './config/db/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AppConfigModule, DbConfigModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
