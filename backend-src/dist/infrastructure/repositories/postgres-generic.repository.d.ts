import { Repository, FindOptionsWhere } from 'typeorm';
import { EntityBase, IRepository } from 'src/domain';
export declare class PostgresGenericRepository<T extends EntityBase> implements IRepository<T> {
    private _repository;
    constructor(repository: Repository<T>);
    getById(id: number): Promise<T>;
    getAll(skip?: number, take?: number): Promise<T[]>;
    find(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | null>;
    findMany(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]>;
    add(entity: T): Promise<T>;
    addMany(entities: T[]): Promise<T[]>;
    update(entity: T): Promise<T>;
    updateMany(entities: T[]): Promise<T[]>;
    delete(id: number): Promise<void>;
}
