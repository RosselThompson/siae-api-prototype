import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultadService } from './facultad.service';
import { FacultadController } from './facultad.controller';
import { Facultad } from './entities/facultad.entity';
import { Recinto } from 'src/recinto/entities/recinto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facultad, Recinto])],
  controllers: [FacultadController],
  providers: [FacultadService],
})
export class FacultadModule {}
