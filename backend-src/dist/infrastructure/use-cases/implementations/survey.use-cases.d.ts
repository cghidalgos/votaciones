import { ISurveyUseCases } from "../../../application/interfaces/survey.abstract.use-cases";
import { IDataServices } from "src/domain/common/db-services.abstract";
import { Survey } from "src/domain";
import { FindOptionsWhere } from "typeorm";
import { ExportSurveyDto } from "src/infrastructure/DTOs/survey/export-survey.dto";
export declare class SurveyUseCases implements ISurveyUseCases {
    private readonly dbService;
    constructor(dbService: IDataServices);
    getAll(skip?: number, take?: number): Promise<Survey[]>;
    find(options: FindOptionsWhere<Survey> | FindOptionsWhere<Survey>[]): Promise<Survey>;
    findSurveysBy(title: string): Promise<Survey[]>;
    add(survey: Survey): Promise<number>;
    update(survey: Survey, id: number): Promise<void>;
    updateSurveyState(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    getSurveyResults(id: number): Promise<ExportSurveyDto>;
    getById(id: number): Promise<Survey>;
    private userExists;
    private surveyExists;
    private countAnswersVotes;
    private countAnswersShares;
    private getAnswersUsers;
}
