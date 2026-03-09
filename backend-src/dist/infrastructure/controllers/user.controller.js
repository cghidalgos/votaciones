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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../../application/interfaces");
const DTOs_1 = require("../DTOs");
const entities_1 = require("../../domain/entities");
const nestjs_1 = require("@automapper/nestjs");
const users_1 = require("../DTOs/users");
const services_1 = require("../services");
const roles_guard_1 = require("../services/jwt/guards/roles.guard");
const decorators_1 = require("../decorators");
const enums_1 = require("../../domain/enums");
const api_1 = require("../DTOs/api");
let UserController = class UserController {
    constructor(userUseCases, mapper) {
        this.userUseCases = userUseCases;
        this.mapper = mapper;
    }
    async getAllUsers(query) {
        const users = await this.userUseCases.getAll(query.skip, query.take);
        return this.mapper.mapArray(users, entities_1.User, DTOs_1.UserDto);
    }
    async getUser(id) {
        id = Number(id);
        const user = await this.userUseCases.getById(id);
        return this.mapper.map(user, entities_1.User, DTOs_1.UserDto);
    }
    async findUsers(code) {
        const users = await this.userUseCases.findManyByCode(code);
        return this.mapper.mapArray(users, entities_1.User, DTOs_1.UserDto);
    }
    async addUser(addUserDto) {
        const user = this.mapper.map(addUserDto, DTOs_1.AddUserDto, entities_1.User);
        await this.userUseCases.add(user);
        return;
    }
    async addManyUsers(users) {
        const usersMapped = this.mapper.mapArray(users, DTOs_1.AddUserDto, entities_1.User);
        await this.userUseCases.addMany(usersMapped);
        return;
    }
    async updateUser(updateUserDto, id) {
        const user = this.mapper.map(updateUserDto, users_1.UpdateUserDto, entities_1.User);
        await this.userUseCases.update(user, parseInt(id));
        return;
    }
    async updateState(code) {
        await this.userUseCases.updateState(code);
        return;
    }
    async deleteUser(id) {
        id = Number(id);
        await this.userUseCases.delete(id);
        return;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_1.AddUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)('many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addManyUsers", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_1.UpdateUserDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Patch)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateState", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.ADMIN),
    (0, common_1.UseGuards)(services_1.JwtAuthGuard),
    (0, common_1.Controller)('api/v1/users'),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [interfaces_1.IUserUseCases, Object])
], UserController);
//# sourceMappingURL=user.controller.js.map