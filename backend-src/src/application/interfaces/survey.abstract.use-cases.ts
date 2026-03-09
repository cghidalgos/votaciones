import { Survey } from "src/domain/entities";
import { ExportSurveyDto } from "src/infrastructure/DTOs/survey/export-survey.dto";
import { FindOptionsWhere } from "typeorm";

export abstract class ISurveyUseCases {
  abstract add(survey: Survey): Promise<number>;
  abstract update(survey: Survey, id:number): Promise<void>;
  abstract updateSurveyState(id:number):Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract getById(id: number): Promise<Survey>;
  abstract getAll(skip?:number, take?:number): Promise<Survey[]>;
  abstract find(options:FindOptionsWhere<Survey> | FindOptionsWhere<Survey>[]): Promise<Survey>;
  abstract findSurveysBy(title: string): Promise<Survey[]>;
  abstract getSurveyResults(id: number): Promise<ExportSurveyDto>;
}