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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto) {
    const isExist = await this.findByEmail(userDto.email);
    if (isExist) throw customError('This user already exists');
    const hash = await hashPassword(userDto.password);
    const user = { ...userDto, password: hash };
    return await this.userRepository.save(user);
  }

  async findAll(userQueryDto: UserQueryDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
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
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, userDto: UserDto) {
    const hash = await hashPassword(userDto.password);
    const user = { ...userDto, id, password: hash };
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.userRepository.update(id, { isActive: false });
    return customOk('User was removed');
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
