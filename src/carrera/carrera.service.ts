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
    private facultyRepository: Repository<Facultad>,
  ) {}

  async create(careerDto: CarreraDto) {
    const isValidateFaculty = await this.validateFaculties(
      careerDto.facultades,
    );
    if (!isValidateFaculty) throw customError('Facultades no válidas');

    return await this.careerRepository.save(careerDto);
  }

  async findAll(careerQueryDto: CarreraQueryDto) {
    const queryBuilder = this.careerRepository.createQueryBuilder('carrera');
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      careerQueryDto,
      queryBuilder,
    );
    const paginationData = await getPaginationData(
      'carrera',
      careerQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  findOne(id: number) {
    return this.careerRepository.findOneBy({ id });
  }

  async update(id: number, careerDto: CarreraDto) {
    const isValidateFaculty = await this.validateFaculties(
      careerDto.facultades,
    );
    if (!isValidateFaculty) throw customError('Facultades no válidas');

    await this.careerRepository.update(id, {
      nombre: careerDto.nombre,
      facultades: careerDto.facultades,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.careerRepository.update(id, { _isActive: false });
    return customOk('Carrera eliminada correctamente');
  }

  async validateFaculties(faculties: Facultad[]) {
    let flag = true;
    await Promise.all(
      faculties.map(async (f) => {
        const faculty = await this.facultyRepository.findOneBy({ id: f.id });
        if (!faculty?.id) {
          flag = false;
        }
      }),
    );
    return flag;
  }
}
