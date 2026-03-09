"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCases = void 0;
const db_services_abstract_1 = require("../../../domain/common/db-services.abstract");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const encryption_1 = require("../../../domain/encryption");
let UserUseCases = class UserUseCases {
    constructor(dbService, bcryptServcie) {
        this.dbService = dbService;
        this.bcryptServcie = bcryptServcie;
    }
    async getAll(skip, take) {
        return this.dbService.user.getAll(skip, take);
    }
    async find(options) {
        return this.dbService.user.find(options);
    }
    async findManyByCode(code) {
        return this.dbService.user.findMany({ code: (0, typeorm_1.Like)(`%${code}%`) });
    }
    async add(user) {
        if (await this.userExists({ code: user.code })) {
            throw new common_1.BadRequestException(`El usuario con el No de Cédula ${user.code} ya existe`);
        }
        user.password = await this.bcryptServcie.hash(user.password);
        await this.dbService.user.add(user);
    }
    async addMany(users) {
        const codes = users.map(user => user.code);
        const existingUsers = await this.dbService.user.findMany({ code: (0, typeorm_1.In)(codes) });
        if (existingUsers.length > 0) {
            throw new common_1.BadRequestException(`Algunos usuarios que intenta agregar ya existen en la base de datos`);
        }
        if (codes.length !== new Set(codes).size) {
            throw new common_1.BadRequestException(`No se pueden agregar usuarios con códigos duplicados`);
        }
        for (const user of users) {
            user.password = await this.bcryptServcie.hash(user.password);
        }
        await this.dbService.user.addMany(users);
    }
    async update(user, id) {
        if (!await this.userExists({ id })) {
            throw new common_1.BadRequestException(`El usuario con el id ${id} no existe`);
        }
        if (user.id !== id) {
            throw new common_1.BadRequestException(`El id ${user.id} no coincide con el id ${id} proporcionado en la URL`);
        }
        const userDb = await this.dbService.user.find({ id });
        if (userDb.code !== user.code && await this.userExists({ code: user.code })) {
            throw new common_1.BadRequestException(`El usuario con el No de Cédula ${user.code} ya existe`);
        }
        if (user.password === null || user.password === undefined || user.password === "") {
            user.password = userDb.password;
            await this.dbService.user.update(user);
            return;
        }
        if (user.password.length < 8) {
            throw new common_1.BadRequestException(`La contraseña debe tener al menos 8 caracteres`);
        }
        const hash = userDb.password;
        const equalPasswords = await this.bcryptServcie.compare(user.password, hash);
        if (!equalPasswords) {
            user.password = await this.bcryptServcie.hash(user.password);
        }
        await this.dbService.user.update(user);
    }
    async delete(id) {
        if (!await this.userExists({ id })) {
            throw new common_1.BadRequestException(`El usuario con id ${id} no existe`);
        }
        await this.dbService.user.delete(id);
    }
    async getById(id) {
        return this.dbService.user.getById(id);
    }
    async updateState(code) {
        if (!await this.userExists({ code })) {
            throw new common_1.BadRequestException(`El usuario con el No de Cédula ${code} no existe`);
        }
        const user = await this.dbService.user.find({ code });
        user.isPresent = !user.isPresent;
        await this.dbService.user.update(user);
    }
    async userExists(options) {
        const user = await this.dbService.user.find(options);
        return user !== null ? true : false;
    }
};
exports.UserUseCases = UserUseCases;
exports.UserUseCases = UserUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_services_abstract_1.IDataServices,
        encryption_1.IBcryptService])
], UserUseCases);
//# sourceMappingURL=user.use-cases.js.map