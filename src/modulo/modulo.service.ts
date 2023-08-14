import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customError, customOk } from 'src/common/helpers/customResponse';
import { setFilterToQueryBuilder } from './filters/query.filter';
import { getPaginationData } from 'src/common/helpers/getPaginationData';
import { ModuloDto } from './dto/modulo.dto';
import { Modulo } from './entities/modulo.entity';
import { ModuloQueryDto } from './dto/modulo-query.dto';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo)
    private moduleRepository: Repository<Modulo>,
  ) {}

  async create(moduleDto: ModuloDto) {
    const isExist = await this.findByName(moduleDto.nombre);
    if (isExist) throw customError('Este módulo ya existe');

    return await this.moduleRepository.save(moduleDto);
  }

  async findAll(moduleQueryDto: ModuloQueryDto) {
    const queryBuilder = this.moduleRepository.createQueryBuilder('modulo');
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      moduleQueryDto,
      queryBuilder,
    );
    const paginationData = await getPaginationData(
      'modulo',
      moduleQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  findOne(id: number) {
    return this.moduleRepository.findOneBy({ id });
  }

  async update(id: number, moduleDto: ModuloDto) {
    await this.moduleRepository.update(id, {
      nombre: moduleDto.nombre,
      link: moduleDto.link,
      icono: moduleDto.icono,
      orden: moduleDto.orden,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.moduleRepository.update(id, { _isActive: false });
    return customOk('Módulo eliminado correctamente');
  }

  async findByName(name: string) {
    return await this.moduleRepository.findOneBy({ nombre: name });
  }
}
