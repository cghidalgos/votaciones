import { FindOptionsWhere } from "typeorm";
import { EntityBase } from "./entity.base";
export declare abstract class IRepository<T extends EntityBase> {
    abstract getById(id: number): Promise<T>;
    abstract getAll(skip?: number, take?: number): Promise<T[]>;
    abstract find(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | null>;
    abstract findMany(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]>;
    abstract add(entity: T): Promise<T>;
    abstract addMany(entities: T[]): Promise<T[]>;
    abstract update(entity: T): Promise<T>;
    abstract updateMany(entities: T[]): Promise<T[]>;
    abstract delete(id: number): Promise<void>;
}
