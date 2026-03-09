import { IAnswerUseCases } from '../../application/interfaces';
import { Mapper } from '@automapper/core';
import { AnswerDto } from '../DTOs';
export declare class AnswerController {
    private readonly answerUseCases;
    private readonly mapper;
    constructor(answerUseCases: IAnswerUseCases, mapper: Mapper);
    getAnswerById(id: number): Promise<AnswerDto>;
    getAnswersBySurveyId(id: number): Promise<AnswerDto[]>;
    addAnswers(answers: AnswerDto[]): Promise<void>;
    updateAnswers(answers: AnswerDto[]): Promise<void>;
    deleteAnswer(id: number): Promise<void>;
}
