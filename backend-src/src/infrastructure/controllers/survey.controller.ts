import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ISurveyUseCases } from '../../application/interfaces';
import { SurveyDto } from '../DTOs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Survey } from 'src/domain/entities';
import { JwtAuthGuard } from '../services';
import { RolesGuard } from '../services/jwt/guards/roles.guard';
import { GetPayload, Roles } from '../decorators';
import { Role } from 'src/domain/enums';
import { PayloadDto } from 'src/domain/DTOs';
import { ExportSurveyDto } from '../DTOs/survey/export-survey.dto';
import { PaginationDto } from '../DTOs/api';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/surveys')
export class SurveyController {
    constructor(
        private readonly surveyUseCases: ISurveyUseCases,
        @InjectMapper() private readonly mapper: Mapper
        ) {}

    @Get()
    async getAllSurveys(@Query() query: PaginationDto): Promise<SurveyDto[]>{
        const surveys = await this.surveyUseCases.getAll(query.skip, query.take);
        return this.mapper.mapArray(surveys, Survey, SurveyDto);
    }

    @Get('/:id')
    async getSurveyById(@Param('id') id: number): Promise<SurveyDto>{
        id = Number(id);
        const survey = await this.surveyUseCases.getById(id);
        return this.mapper.map(survey, Survey, SurveyDto);
    }

    @Get('/title/:title')
    async getSurveysByTitle(@Param('title') title: string): Promise<SurveyDto[]>{
        const surveys = await this.surveyUseCases.findSurveysBy(title);
        return this.mapper.mapArray(surveys, Survey, SurveyDto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    async addSurvey(@Body()survey: SurveyDto, @GetPayload() payload:PayloadDto): Promise<{id:number}>{
        survey.userId = payload.id;
        const surveyEntity = this.mapper.map(survey, SurveyDto, Survey);
        const surveyId = await this.surveyUseCases.add(surveyEntity);
        return {id:surveyId};
    }
    
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Put('/:id')
    async updateSurvey(@Param('id') id: number, @Body()survey: SurveyDto): Promise<void>{
        id = Number(id);
        const surveyEntity = this.mapper.map(survey, SurveyDto, Survey);
        await this.surveyUseCases.update(surveyEntity, id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Patch('/:id')
    async updateSurveyState(@Param('id') id: number): Promise<void>{
        id = Number(id);
        await this.surveyUseCases.updateSurveyState(id);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete('/:id')
    async deleteSurvey(@Param('id') id: number): Promise<void>{
        id = Number(id);
        await this.surveyUseCases.delete(id);
    }

    @Get('/:id/results')
    async getSurveyResults(@Param('id') id: number): Promise<ExportSurveyDto>{
        id = Number(id);
        return await this.surveyUseCases.getSurveyResults(id);
    }
    
}
