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
exports.SurveyController = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../../application/interfaces");
const DTOs_1 = require("../DTOs");
const nestjs_1 = require("@automapper/nestjs");
const entities_1 = require("../../domain/entities");
const services_1 = require("../services");
const roles_guard_1 = require("../services/jwt/guards/roles.guard");
const decorators_1 = require("../decorators");
const enums_1 = require("../../domain/enums");
const api_1 = require("../DTOs/api");
let SurveyController = class SurveyController {
    constructor(surveyUseCases, mapper) {
        this.surveyUseCases = surveyUseCases;
        this.mapper = mapper;
    }
    async getAllSurveys(query) {
        const surveys = await this.surveyUseCases.getAll(query.skip, query.take);
        return this.mapper.mapArray(surveys, entities_1.Survey, DTOs_1.SurveyDto);
    }
    async getSurveyById(id) {
        id = Number(id);
        const survey = await this.surveyUseCases.getById(id);
        return this.mapper.map(survey, entities_1.Survey, DTOs_1.SurveyDto);
    }
    async getSurveysByTitle(title) {
        const surveys = await this.surveyUseCases.findSurveysBy(title);
        return this.mapper.mapArray(surveys, entities_1.Survey, DTOs_1.SurveyDto);
    }
    async addSurvey(survey, payload) {
        survey.userId = payload.id;
        const surveyEntity = this.mapper.map(survey, DTOs_1.SurveyDto, entities_1.Survey);
        const surveyId = await this.surveyUseCases.add(surveyEntity);
        return { id: surveyId };
    }
    async updateSurvey(id, survey) {
        id = Number(id);
        const surveyEntity = this.mapper.map(survey, DTOs_1.SurveyDto, entities_1.Survey);
        await this.surveyUseCases.update(surveyEntity, id);
    }
    async updateSurveyState(id) {
        id = Number(id);
        await this.surveyUseCases.updateSurveyState(id);
    }
    async deleteSurvey(id) {
        id = Number(id);
        await this.surveyUseCases.delete(id);
    }
    async getSurveyResults(id) {
        id = Number(id);
        return await this.surveyUseCases.getSurveyResults(id);
    }
};
exports.SurveyController = SurveyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getAllSurveys", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getSurveyById", null);
__decorate([
    (0, common_1.Get)('/title/:title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getSurveysByTitle", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetPayload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_1.SurveyDto, Object]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "addSurvey", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.ADMIN),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, DTOs_1.SurveyDto]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "updateSurvey", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.ADMIN),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "updateSurveyState", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.ADMIN),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "deleteSurvey", null);
__decorate([
    (0, common_1.Get)('/:id/results'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getSurveyResults", null);
exports.SurveyController = SurveyController = __decorate([
    (0, common_1.UseGuards)(services_1.JwtAuthGuard),
    (0, common_1.Controller)('api/v1/surveys'),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [interfaces_1.ISurveyUseCases, Object])
], SurveyController);
//# sourceMappingURL=survey.controller.js.map