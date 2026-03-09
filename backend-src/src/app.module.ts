import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UseCasesModule } from './infrastructure/use-cases/use-cases.module';
import { PostgresDbServicesModule } from './infrastructure'; 
import { UserController, AnswerController, VoteController, SurveyController } from './infrastructure/controllers';
import { JwtTokenModule } from './infrastructure/services/jwt/jwt.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { MappersModule } from './infrastructure/services/mapping/mappers.module';
import { AuthController } from './infrastructure/controllers/auth.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    UseCasesModule,
    PostgresDbServicesModule,
    JwtTokenModule,
    BcryptModule,
    MappersModule
  ],
  controllers: [
    AppController,
    UserController,
    AnswerController,
    VoteController,
    SurveyController,
    AuthController
  ],
  providers: [AppService],
})
export class AppModule {}
