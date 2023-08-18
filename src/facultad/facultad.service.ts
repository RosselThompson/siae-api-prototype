import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customError, customOk } from 'src/common/helpers/customResponse';
import { setFilterToQueryBuilder } from './filters/query.filter';
import { getPaginationData } from 'src/common/helpers/getPaginationData';
import { Facultad } from './entities/facultad.entity';
import { FacultadDto } from './dto/facultad.dto';
import { FacultadQueryDto } from './dto/facultad-query.dto';
import { Recinto } from 'src/recinto/entities/recinto.entity';

@Injectable()
export class FacultadService {
  constructor(
    @InjectRepository(Facultad)
    private facultyRepository: Repository<Facultad>,

    @InjectRepository(Recinto)
    private recintoRepository: Repository<Recinto>,
  ) {}

  async create(facultyDto: FacultadDto) {
    const campus = await this.recintoRepository.findOneBy({
      id: facultyDto.recintoId,
    });
    if (!campus) throw customError('Este recinto no existe');

    return await this.facultyRepository.save({
      ...facultyDto,
      recinto: campus,
    });
  }

  async findAll(facultyQueryDto: FacultadQueryDto) {
    const facultyQueryBuilder = this.generateFacultyQueryBuilder();
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      facultyQueryDto,
      facultyQueryBuilder,
    );
    const paginationData = await getPaginationData(
      'facultad',
      facultyQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  async findOne(id: number) {
    try {
      const facultyQueryBuilder = this.generateFacultyQueryBuilder();
      const faculty = await facultyQueryBuilder
        .where('facultad.id = :id', { id })
        .getOne();
      if (!faculty) throw customError('Esta facultad/sede no existe');
      return faculty;
    } catch (err) {
      throw customError(err?.message);
    }
  }

  async update(id: number, facultyDto: FacultadDto) {
    const campus = await this.facultyRepository.findOneBy({
      id: facultyDto.recintoId,
    });
    if (!campus) throw customError('Este Recinto no existe');

    await this.facultyRepository.update(id, {
      nombre: facultyDto.nombre,
      tipo: facultyDto.tipo,
      codigo: facultyDto.codigo,
      siglas: facultyDto.siglas,
      recinto: campus,
    });

    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.facultyRepository.update(id, { _isActive: false });
    return customOk('Facultad eliminada correctamente');
  }

  generateFacultyQueryBuilder() {
    return this.facultyRepository
      .createQueryBuilder('facultad')
      .leftJoinAndSelect('facultad.recinto', 'recinto');
  }
}
