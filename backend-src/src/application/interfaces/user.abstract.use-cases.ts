import { User } from "src/domain/entities";
import { FindOptionsWhere } from "typeorm";

export abstract class IUserUseCases {
  abstract add(user: User): Promise<void>;
  abstract addMany(users: User[]): Promise<void>;
  abstract update(user: User, id:number): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract getById(id: number): Promise<User>;
  abstract getAll(skip?:number, take?:number): Promise<User[]>;
  abstract find(options:FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User>;
  abstract findManyByCode(code:string): Promise<User[]>;
  abstract updateState(code: string): Promise<void>;
}