import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from '../common/helpers/hashPassword';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const isActive = user._isActive;
    const isValidPassword = user.hashPassword
      ? await checkPassword(password, user.password)
      : user.password === password;
    if (user && isActive && isValidPassword) return user;
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
