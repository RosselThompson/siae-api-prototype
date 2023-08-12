import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/common/helpers/hashPassword';
import { customError, customOk } from 'src/common/helpers/customResponse';
import { UserQueryDto } from './dto/user-query.dto';
import { getPaginationData } from 'src/common/helpers/getPaginationData';
import { setFilterToQueryBuilder } from './filters/query.filter';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(userDto: UserDto) {
    const isExist = await this.findByEmail(userDto.email);
    if (isExist) throw customError('This user already exists');

    const role = await this.roleRepository.findOneBy({ id: userDto.roleId });
    if (!role) throw customError('This role does not exist');

    const hash = await hashPassword(userDto.password);
    const user = { ...userDto, password: hash, role };

    return await this.userRepository.save(user);
  }

  async findAll(userQueryDto: UserQueryDto) {
    const userQueryBuilder = this.generateUserQueryBuilder();
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      userQueryDto,
      userQueryBuilder,
    );
    const paginationData = await getPaginationData(
      'user',
      userQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  async findOne(id: string) {
    try {
      const userQueryBuilder = this.generateUserQueryBuilder();
      const user = await userQueryBuilder
        .where('user.id = :id', { id })
        .getOne();
      if (!user) throw customError('This user does not exist');
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
          'role.permissions',
          'permission',
          'permission.isActive = :isActive',
          {
            isActive: true,
          },
        )
        .leftJoinAndSelect('permission.menuItem', 'menuItem');
      const user = await userQueryBuilder
        .where('user.id = :id', { id })
        .getOne();
      if (!user) throw customError('This user does not exist');
      return user;
    } catch (err) {
      throw customError(err?.message);
    }
  }

  async update(id: string, userDto: UserDto) {
    const role = await this.roleRepository.findOneBy({ id: userDto.roleId });
    if (!role) throw customError('This role does not exist');

    await this.userRepository.update(id, {
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      role,
    });

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.userRepository.update(id, { isActive: false });
    return customOk('User was removed');
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  generateUserQueryBuilder() {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role');
  }
}
