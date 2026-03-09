import { ISurveyUseCases } from '../../application/interfaces';
import { SurveyDto } from '../DTOs';
import { Mapper } from '@automapper/core';
import { PayloadDto } from 'src/domain/DTOs';
import { ExportSurveyDto } from '../DTOs/survey/export-survey.dto';
import { PaginationDto } from '../DTOs/api';
export declare class SurveyController {
    private readonly surveyUseCases;
    private readonly mapper;
    constructor(surveyUseCases: ISurveyUseCases, mapper: Mapper);
    getAllSurveys(query: PaginationDto): Promise<SurveyDto[]>;
    getSurveyById(id: number): Promise<SurveyDto>;
    getSurveysByTitle(title: string): Promise<SurveyDto[]>;
    addSurvey(survey: SurveyDto, payload: PayloadDto): Promise<{
        id: number;
    }>;
    updateSurvey(id: number, survey: SurveyDto): Promise<void>;
    updateSurveyState(id: number): Promise<void>;
    deleteSurvey(id: number): Promise<void>;
    getSurveyResults(id: number): Promise<ExportSurveyDto>;
}
