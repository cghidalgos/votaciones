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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../../application/interfaces");
const nestjs_1 = require("@automapper/nestjs");
const domain_1 = require("../../domain");
const DTOs_1 = require("../DTOs");
const services_1 = require("../services");
const roles_guard_1 = require("../services/jwt/guards/roles.guard");
const decorators_1 = require("../decorators");
const enums_1 = require("../../domain/enums");
let AnswerController = class AnswerController {
    constructor(answerUseCases, mapper) {
        this.answerUseCases = answerUseCases;
        this.mapper = mapper;
    }
    async getAnswerById(id) {
        id = Number(id);
        const answer = await this.answerUseCases.getById(id);
        return this.mapper.map(answer, domain_1.Answer, DTOs_1.AnswerDto);
    }
    async getAnswersBySurveyId(id) {
        id = Number(id);
        const answers = await this.answerUseCases.findBySurvey(id);
        return this.mapper.mapArray(answers, domain_1.Answer, DTOs_1.AnswerDto);
    }
    async addAnswers(answers) {
        const answerEntity = this.mapper.mapArray(answers, DTOs_1.AnswerDto, domain_1.Answer);
        await this.answerUseCases.addMany(answerEntity);
    }
    async updateAnswers(answers) {
        const answersEntities = this.mapper.mapArray(answers, DTOs_1.AnswerDto, domain_1.Answer);
        await this.answerUseCases.updateMany(answersEntities);
    }
    async deleteAnswer(id) {
        id = Number(id);
        await this.answerUseCases.delete(id);
    }
};
exports.AnswerController = AnswerController;
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAnswerById", null);
__decorate([
    (0, common_1.Get)('/survey/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAnswersBySurveyId", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "addAnswers", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.ADMIN),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "updateAnswers", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.ADMIN),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "deleteAnswer", null);
exports.AnswerController = AnswerController = __decorate([
    (0, common_1.UseGuards)(services_1.JwtAuthGuard),
    (0, common_1.Controller)('api/v1/answers'),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [interfaces_1.IAnswerUseCases, Object])
], AnswerController);
//# sourceMappingURL=answer.controller.js.map