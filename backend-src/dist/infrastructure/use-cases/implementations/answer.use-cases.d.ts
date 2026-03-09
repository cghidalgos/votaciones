import { IAnswerUseCases } from "../../../application/interfaces/answer.abstract.use-cases";
import { Answer } from "src/domain";
import { IDataServices } from "src/domain/common/db-services.abstract";
import { FindOptionsWhere } from "typeorm";
export declare class AnswerUseCases implements IAnswerUseCases {
    private readonly dbService;
    constructor(dbService: IDataServices);
    getAll(): Promise<Answer[]>;
    find(options: FindOptionsWhere<Answer> | FindOptionsWhere<Answer>[]): Promise<Answer>;
    findBySurvey(id: number): Promise<Answer[]>;
    add(answer: Answer): Promise<void>;
    addMany(answers: Answer[]): Promise<Answer[]>;
    update(answer: Answer, id: number): Promise<void>;
    updateMany(answers: Answer[]): Promise<Answer[]>;
    delete(id: number): Promise<void>;
    getById(id: number): Promise<Answer>;
    private surveyExists;
    private answerExists;
    private areAllEqual;
}
