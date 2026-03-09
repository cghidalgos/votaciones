import { Module } from '@nestjs/common';
import { 
    IAnswerUseCases,
    ISurveyUseCases,
    IUserUseCases,
    IVoteUseCases
 } from 'src/application/interfaces';
 import {
    AnswerUseCases,
    SurveyUseCases,
    UserUseCases,
    VoteUseCases
 } from './implementations';
import { PostgresDbServicesModule } from '../services';
import { JwtTokenModule } from 'src/infrastructure/services/jwt/jwt.module';
import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
 


@Module({
    imports: [PostgresDbServicesModule, JwtTokenModule, BcryptModule],
    providers: [{
        provide: IUserUseCases,
        useClass: UserUseCases
    },
    {
        provide: ISurveyUseCases,
        useClass: SurveyUseCases
    },
    {
        provide: IAnswerUseCases,
        useClass: AnswerUseCases
    },
    {
        provide: IVoteUseCases,
        useClass: VoteUseCases
    }
    ],
    exports: [
        IUserUseCases,
        ISurveyUseCases,
        IAnswerUseCases,
        IVoteUseCases,
    ]
})
export class UseCasesModule {}
