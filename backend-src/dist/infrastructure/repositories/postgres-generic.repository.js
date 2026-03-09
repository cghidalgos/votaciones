"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresGenericRepository = void 0;
class PostgresGenericRepository {
    constructor(repository) {
        this._repository = repository;
    }
    async getById(id) {
        return this._repository.findOneBy({ id });
    }
    async getAll(skip, take) {
        return this._repository.find({ skip, take });
    }
    async find(options) {
        return await this._repository.findOneBy(options);
    }
    async findMany(options) {
        return await this._repository.findBy(options);
    }
    async add(entity) {
        return this._repository.save(entity);
    }
    async addMany(entities) {
        return this._repository.save(entities);
    }
    async update(entity) {
        return this._repository.save(entity);
    }
    async updateMany(entities) {
        return this._repository.save(entities);
    }
    async delete(id) {
        await this._repository.delete(id);
    }
}
exports.PostgresGenericRepository = PostgresGenericRepository;
//# sourceMappingURL=postgres-generic.repository.js.map