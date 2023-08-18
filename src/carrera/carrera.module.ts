import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { Carrera } from './entities/carrera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera])],
  controllers: [CarreraController],
  providers: [CarreraService],
})
export class CarreraModule {}
