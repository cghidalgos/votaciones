import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IAuthUseCases } from '../../../../domain/jwt';
import { User } from 'src/domain/entities';
import { LogInUserDto } from 'src/infrastructure/DTOs';
import { Logger } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: IAuthUseCases) {
    super({
      usernameField: 'code',
      passwordField: 'password',
    });
  }

  async validate(code:string, password:string): Promise<User> {
    const user = await this.authService.getUserBy(code);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hash = user.password;

    const isPasswordValid = await this.authService.validate(password, hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}