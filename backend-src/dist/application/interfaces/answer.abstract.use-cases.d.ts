import { Answer } from "src/domain/entities";
import { FindOptionsWhere } from "typeorm";
export declare abstract class IAnswerUseCases {
    abstract add(answer: Answer): Promise<void>;
    abstract addMany(answers: Answer[]): Promise<Answer[]>;
    abstract update(answer: Answer, id: number): Promise<void>;
    abstract updateMany(answers: Answer[]): Promise<Answer[]>;
    abstract delete(id: number): Promise<void>;
    abstract getById(id: number): Promise<Answer>;
    abstract getAll(): Promise<Answer[]>;
    abstract find(options: FindOptionsWhere<Answer> | FindOptionsWhere<Answer>[]): Promise<Answer>;
    abstract findBySurvey(id: number): Promise<Answer[]>;
}
