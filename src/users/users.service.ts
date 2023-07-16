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
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.innerJoinAndSelect('user.role', 'role');
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      userQueryDto,
      queryBuilder,
    );
    const paginationData = await getPaginationData(
      'user',
      userQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        role: true,
      },
    });
    if (!user) throw customError('This user does not exist');

    return user;
  }

  async update(id: string, userDto: UserDto) {
    const role = await this.roleRepository.findOneBy({ id: userDto.roleId });
    if (!role) throw customError('This role does not exist');

    await this.userRepository.update(id, {
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      role,
    });

    return await this.userRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.userRepository.update(id, { isActive: false });
    return customOk('User was removed');
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
