import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { Carrera } from './entities/carrera.entity';
import { Facultad } from 'src/facultad/entities/facultad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera, Facultad])],
  controllers: [CarreraController],
  providers: [CarreraService],
})
export class CarreraModule {}
