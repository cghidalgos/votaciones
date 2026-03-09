import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt.service';
import { IJwtService } from 'src/domain/jwt/jwt.abstract';
import { IJwtConfigService } from "src/domain/config";
import { JwtConfigService } from './jwt-config.service';
import { LocalStrategy, JwtStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { IAuthUseCases } from 'src/domain'; 
import { AuthUseCases } from '../../use-cases/implementations'; 
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { PostgresDbServicesModule } from '../postgres-db-services';

@Module({
  imports: [
    PassportModule,
    BcryptModule,
    PostgresDbServicesModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
  ],
  providers: [{
    provide: IJwtService,
    useClass: JwtTokenService
  },{
    provide: IJwtConfigService,
    useClass: JwtConfigService
  },
  {
    provide: IAuthUseCases,
    useClass: AuthUseCases
  },
  LocalStrategy,
  JwtStrategy
],
exports:[IAuthUseCases ]
})
export class JwtTokenModule {}
