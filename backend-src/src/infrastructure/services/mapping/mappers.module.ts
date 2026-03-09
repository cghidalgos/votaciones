import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserMapperService } from './mappers/user.mapper.service';
import { AnswerMapperService } from './mappers/answer-mapper.service';
import { VoteMapperService } from './mappers/votes-mapper.service';
import { SurveyMapperService } from './mappers/survey-mapper.service';

@Module({
    imports: [
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        }),
    ],
    providers:[UserMapperService, AnswerMapperService, VoteMapperService, SurveyMapperService]
})
export class MappersModule {}
