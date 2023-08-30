import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customError, customOk } from 'src/common/helpers/customResponse';
import { setFilterToQueryBuilder } from './filters/query.filter';
import { getPaginationData } from 'src/common/helpers/getPaginationData';
import { Carrera } from './entities/carrera.entity';
import { CarreraDto } from './dto/carrera.dto';
import { CarreraQueryDto } from './dto/carrera-query.dto';
import { Facultad } from 'src/facultad/entities/facultad.entity';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private careerRepository: Repository<Carrera>,

    @InjectRepository(Facultad)
    private readonly facultyRepository: Repository<Facultad>,
  ) {}

  async create(careerDto: CarreraDto) {
    const faculty = await this.facultyRepository.findOneBy({
      id: careerDto.facultadId,
    });
    if (!faculty) throw customError('Esta facultad no existe');

    return await this.careerRepository.save({
      ...careerDto,
      facultad: faculty,
    });
  }

  async findAll(careerQueryDto: CarreraQueryDto) {
    const careerQueryBuilder = this.generateCareerQueryBuilder();
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      careerQueryDto,
      careerQueryBuilder,
    );
    const paginationData = await getPaginationData(
      'carrera',
      careerQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  async findOne(id: number) {
    try {
      const careerQueryBuilder = this.generateCareerQueryBuilder();
      const career = await careerQueryBuilder
        .where('carrera.id = :id', { id })
        .getOne();
      if (!career) throw customError('Esta carrera no existe');
      return career;
    } catch (err) {
      throw customError(err?.message);
    }
  }

  async update(id: number, careerDto: CarreraDto) {
    const faculty = await this.facultyRepository.findOneBy({
      id: careerDto.facultadId,
    });
    if (!faculty) throw customError('Esta facultad no existe');

    await this.careerRepository.update(id, {
      nombre: careerDto.nombre,
      facultad: faculty,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.careerRepository.update(id, { _isActive: false });
    return customOk('Carrera eliminada correctamente');
  }

  generateCareerQueryBuilder() {
    return this.careerRepository
      .createQueryBuilder('carrera')
      .leftJoinAndSelect('carrera.facultad', 'facultad');
  }
}
