import { Vote } from "src/domain/entities";
import { FindOptionsWhere } from "typeorm";

export abstract class IVoteUseCases {
  abstract add(vote: Vote): Promise<void>;
  abstract update(vote: Vote, id:number): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract getById(id: number): Promise<Vote>;
  abstract getAll(): Promise<Vote[]>;
  abstract find(options:FindOptionsWhere<Vote> | FindOptionsWhere<Vote>[]): Promise<Vote>;
  abstract findByAnswer(id: number): Promise<Vote[]>;
}