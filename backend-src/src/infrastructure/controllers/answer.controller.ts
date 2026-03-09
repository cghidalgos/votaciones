import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IAnswerUseCases } from '../../application/interfaces';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Answer } from 'src/domain';
import { AnswerDto } from '../DTOs';
import { JwtAuthGuard } from '../services';
import { RolesGuard } from '../services/jwt/guards/roles.guard';
import { Roles } from '../decorators';
import { Role } from 'src/domain/enums';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/answers')
export class AnswerController {
    constructor(
        private readonly answerUseCases: IAnswerUseCases,
        @InjectMapper() private readonly mapper: Mapper
    ) {}

    @Get('/:id')
    async getAnswerById(@Param('id') id: number): Promise<AnswerDto>{
        id = Number(id);
        const answer:Answer = await this.answerUseCases.getById(id);
        return this.mapper.map(answer, Answer, AnswerDto);
    }

    @Get('/survey/:id')
    async getAnswersBySurveyId(@Param('id') id: number): Promise<AnswerDto[]>{
        id = Number(id);
        const answers:Answer[] = await this.answerUseCases.findBySurvey(id);
        return this.mapper.mapArray(answers, Answer, AnswerDto);
    }


    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    async addAnswers(@Body() answers:AnswerDto[]): Promise<void>{
        const answerEntity = this.mapper.mapArray(answers, AnswerDto, Answer);
        await this.answerUseCases.addMany(answerEntity);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Put()
    async updateAnswers(@Body()answers:AnswerDto[]): Promise<void>{
        const answersEntities = this.mapper.mapArray(answers, AnswerDto, Answer);
        await this.answerUseCases.updateMany(answersEntities);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete('/:id')
    async deleteAnswer(@Param('id') id: number): Promise<void>{
        id = Number(id);
        await this.answerUseCases.delete(id);
    }
    
}
