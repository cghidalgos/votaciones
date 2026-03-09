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
exports.AnswerUseCases = void 0;
const common_1 = require("@nestjs/common");
const db_services_abstract_1 = require("../../../domain/common/db-services.abstract");
const typeorm_1 = require("typeorm");
let AnswerUseCases = class AnswerUseCases {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async getAll() {
        return this.dbService.answer.getAll();
    }
    async find(options) {
        return this.dbService.answer.find(options);
    }
    async findBySurvey(id) {
        const survey = await this.dbService.survey.getById(id);
        if (!survey) {
            throw new common_1.BadRequestException(`La encuesta con id ${id} no existe`);
        }
        return this.dbService.answer.findMany({ surveyId: id });
    }
    async add(answer) {
        if (!await this.surveyExists(answer.surveyId)) {
            throw new common_1.BadRequestException(`La encuesta con id ${answer.surveyId} no existe`);
        }
        await this.dbService.answer.add(answer);
    }
    async addMany(answers) {
        const surveyIds = answers.map(answer => answer.surveyId);
        if (!this.areAllEqual(surveyIds)) {
            throw new common_1.BadRequestException(`Las respuestas deben pertenecer a una mismas encuesta`);
        }
        if (!await this.surveyExists(surveyIds[0])) {
            throw new common_1.BadRequestException(`La encuesta con id ${surveyIds[0]} no existe`);
        }
        return await this.dbService.answer.addMany(answers);
    }
    async update(answer, id) {
        if (answer.id !== id) {
            throw new common_1.BadRequestException(`El id ${answer.id} de la respuesta no coincide con el id ${id} proporcionado en la URL`);
        }
        if (!await this.answerExists(answer.id)) {
            throw new common_1.BadRequestException(`La respuesta con id ${answer.id} no existe`);
        }
        const answerDb = await this.dbService.answer.getById(answer.id);
        const equalsSurvey = answerDb.surveyId === answer.surveyId;
        if (!equalsSurvey) {
            throw new common_1.BadRequestException(`La respuesta con el id ${answer.id} no pertenece a la encuesta con id ${answer.surveyId}`);
        }
        if (!await this.surveyExists(answer.surveyId)) {
            throw new common_1.BadRequestException(`La encuesta con id ${answer.surveyId} no existe`);
        }
        await this.dbService.answer.update(answer);
    }
    async updateMany(answers) {
        const surveyIds = answers.map(answer => answer.surveyId);
        if (!this.areAllEqual(surveyIds)) {
            throw new common_1.BadRequestException(`Las respuestas deben pertenecer a una mismas encuesta`);
        }
        if (!await this.surveyExists(surveyIds[0])) {
            throw new common_1.BadRequestException(`La encuesta con id ${surveyIds[0]} no existe`);
        }
        const answersIds = answers.map(answer => answer.id);
        const answersToUpdateDb = await this.dbService.answer.findMany({ id: (0, typeorm_1.In)(answersIds) });
        if (answersToUpdateDb.length !== answersIds.length) {
            throw new common_1.BadRequestException(`Alguna de las respuestas proporcionadas no existe en la base de datos`);
        }
        return await this.dbService.answer.updateMany(answers);
    }
    async delete(id) {
        if (!await this.answerExists(id)) {
            throw new common_1.BadRequestException(`La respuesta con id ${id} no existe`);
        }
        await this.dbService.answer.delete(id);
    }
    async getById(id) {
        return this.dbService.answer.getById(id);
    }
    async surveyExists(id) {
        const survey = await this.dbService.survey.getById(id);
        return (survey !== undefined) && (survey !== null);
    }
    async answerExists(id) {
        const answer = await this.dbService.answer.getById(id);
        return (answer !== undefined) && (answer !== null);
    }
    areAllEqual(arr) {
        return new Set(arr).size === 1;
    }
};
exports.AnswerUseCases = AnswerUseCases;
exports.AnswerUseCases = AnswerUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_services_abstract_1.IDataServices])
], AnswerUseCases);
//# sourceMappingURL=answer.use-cases.js.map