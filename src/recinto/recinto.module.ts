import { Module } from '@nestjs/common';
import { RecintoService } from './recinto.service';
import { RecintoController } from './recinto.controller';
import { Recinto } from './entities/recinto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Recinto])],
  controllers: [RecintoController],
  providers: [RecintoService],
})
export class RecintoModule {}
