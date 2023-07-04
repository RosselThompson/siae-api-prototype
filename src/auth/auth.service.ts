import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { checkPassword } from '../common/helpers/hashPassword';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const isValidPassword = await checkPassword(password, user.password);
    if (user && isValidPassword) return user;
    return null;
  }

  async signIn(user: any) {
    const payload = {
      email: user?.email,
      sub: user?.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
