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
import { FacultadDto } from 'src/facultad/dto/facultad.dto';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private careerRepository: Repository<Carrera>,

    @InjectRepository(Facultad)
    private readonly facultyRepository: Repository<Facultad>,
  ) {}

  async create(careerDto: CarreraDto) {
    const isValidateFaculty = await this.validateFaculties(
      careerDto.facultades,
    );
    if (!isValidateFaculty) throw customError('Facultades no válidas');
    return await this.careerRepository.save(careerDto);
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
    const newCareer = await this.findOne(id);
    if (!newCareer.id) throw customError('Id no válido');

    const loadedFaculties = await this.getFaculties(careerDto.facultades);
    if (loadedFaculties.some((f) => f === null)) {
      throw customError('Facultades no válidas');
    }

    newCareer.facultades = loadedFaculties;
    newCareer.nombre = careerDto.nombre;

    return await this.careerRepository.save(newCareer);
  }

  async remove(id: number) {
    await this.careerRepository.update(id, { _isActive: false });
    return customOk('Carrera eliminada correctamente');
  }

  async getFaculties(faculties: FacultadDto[]) {
    return await Promise.all(
      faculties.map(
        async (f) => await this.facultyRepository.findOneBy({ id: f.id }),
      ),
    );
  }

  async validateFaculties(faculties: FacultadDto[]) {
    const loadedFaculties = await this.getFaculties(faculties);
    return !loadedFaculties.some((f) => f === null);
  }

  generateCareerQueryBuilder() {
    return this.careerRepository
      .createQueryBuilder('carrera')
      .leftJoinAndSelect('carrera.facultades', 'facultad');
  }
}
