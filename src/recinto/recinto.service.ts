import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customOk } from 'src/common/helpers/customResponse';
import { setFilterToQueryBuilder } from './filters/query.filter';
import { getPaginationData } from 'src/common/helpers/getPaginationData';
import { Recinto } from './entities/recinto.entity';
import { RecintoDto } from './dto/recinto.dto';
import { RecintoQueryDto } from './dto/recinto-query.dto';

@Injectable()
export class RecintoService {
  constructor(
    @InjectRepository(Recinto)
    private campusRepository: Repository<Recinto>,
  ) {}

  async create(campusDto: RecintoDto) {
    return await this.campusRepository.save(campusDto);
  }

  async findAll(campusQueryDto: RecintoQueryDto) {
    const queryBuilder = this.campusRepository.createQueryBuilder('recinto');
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      campusQueryDto,
      queryBuilder,
    );
    const paginationData = await getPaginationData(
      'recinto',
      campusQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  findOne(id: number) {
    return this.campusRepository.findOneBy({ id });
  }

  async update(id: number, campusDto: RecintoDto) {
    await this.campusRepository.update(id, {
      nombre: campusDto.nombre,
      siglas: campusDto.siglas,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.campusRepository.update(id, { _isActive: false });
    return customOk('Recinto eliminado correctamente');
  }
}
