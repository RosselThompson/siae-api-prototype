import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/common/helpers/hashPassword';
import { customError, customOk } from 'src/common/helpers/customResponse';
import { getPaginationData } from 'src/common/helpers/getPaginationData';
import { setFilterToQueryBuilder } from './filters/query.filter';
import { UsuarioDto } from './dto/usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { UsuarioQueryDto } from './dto/usuario-query.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private roleRepository: Repository<Rol>,
  ) {}

  async create(userDto: UsuarioDto) {
    const isExist = await this.findByEmail(userDto.email);
    if (isExist) throw customError('Este usuario ya existe');

    const role = await this.roleRepository.findOneBy({ id: userDto.rolId });
    if (!role) throw customError('Este rol no existe');

    const hash = await hashPassword(userDto.password);
    const user = { ...userDto, password: hash, rol: role };

    return await this.userRepository.save(user);
  }

  async findAll(userQueryDto: UsuarioQueryDto) {
    const userQueryBuilder = this.generateUserQueryBuilder();
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      userQueryDto,
      userQueryBuilder,
    );
    const paginationData = await getPaginationData(
      'usuario',
      userQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  async findOne(id: string) {
    try {
      const userQueryBuilder = this.generateUserQueryBuilder();
      const user = await userQueryBuilder
        .where('usuario.id = :id', { id })
        .getOne();
      if (!user) throw customError('Este usuario no existe');
      return user;
    } catch (err) {
      throw customError(err?.message);
    }
  }

  async findUserProfile(id: string) {
    try {
      const userQueryBuilder = this.generateUserQueryBuilder();
      userQueryBuilder
        .leftJoinAndSelect(
          'rol.permisos',
          'permiso',
          'permiso._isActive = :isActive',
          {
            isActive: true,
          },
        )
        .leftJoinAndSelect('permiso.modulo', 'modulo');
      const user = await userQueryBuilder
        .where('usuario.id = :id', { id })
        .getOne();
      if (!user) throw customError('Este usuario no existe');
      return user;
    } catch (err) {
      throw customError(err?.message);
    }
  }

  async update(id: string, userDto: UsuarioDto) {
    const role = await this.roleRepository.findOneBy({ id: userDto.rolId });
    if (!role) throw customError('Este rol no existe');

    await this.userRepository.update(id, {
      nombre: userDto.nombre,
      apellido: userDto.apellido,
      rol: role,
    });

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.userRepository.update(id, { _isActive: false });
    return customOk('Usuario eliminado exitosamente');
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  generateUserQueryBuilder() {
    return this.userRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.rol', 'rol');
  }
}
