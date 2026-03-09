import { Repository, FindOptionsWhere } from 'typeorm';
import { EntityBase, IRepository } from 'src/domain';

export class PostgresGenericRepository<T extends EntityBase> implements IRepository<T> {
    private _repository: Repository<T>;

    constructor(
        repository: Repository<T>
    ) {
        this._repository = repository;
    }

    async getById(id: number): Promise<T> {
        return this._repository.findOneBy({id} as FindOptionsWhere<T>);
    }

    async getAll(skip?: number, take?: number): Promise<T[]> {
        return this._repository.find({ skip, take});
    }

    async find(options:FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | null> {
        return await this._repository.findOneBy(options);
    }

    async findMany(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]> {
        return await this._repository.findBy(options);
    }

    async add(entity: T): Promise<T> {
        return this._repository.save(entity);
    }

    async addMany(entities: T[]): Promise<T[]> {
        return this._repository.save(entities);
    }

    async update(entity: T): Promise<T> {
        return this._repository.save(entity);
    }

    async updateMany(entities: T[]): Promise<T[]> {
        return this._repository.save(entities);
    }

    async delete(id: number): Promise<void> {
        await this._repository.delete(id);
    }
}
