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
exports.SurveyUseCases = void 0;
const db_services_abstract_1 = require("../../../domain/common/db-services.abstract");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let SurveyUseCases = class SurveyUseCases {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async getAll(skip, take) {
        return this.dbService.survey.getAll(skip, take);
    }
    async find(options) {
        return this.dbService.survey.find(options);
    }
    async findSurveysBy(title) {
        return this.dbService.survey.findMany({ title: (0, typeorm_1.Like)(`%${title.toUpperCase().trim()}%`) });
    }
    async add(survey) {
        if (!await this.userExists(survey.userId)) {
            throw new common_1.BadRequestException(`El usuario con id ${survey.userId} no existe`);
        }
        if (await this.surveyExists({ title: survey.title.toUpperCase().trim() })) {
            throw new common_1.BadRequestException(`La encuesta con título ${survey.title} ya existe`);
        }
        survey.title = survey.title.toUpperCase().trim();
        await this.dbService.survey.add(survey);
        return survey.id;
    }
    async update(survey, id) {
        if (!await this.surveyExists({ id: survey.id })) {
            throw new common_1.BadRequestException(`La encuesta con id ${survey.id} no existe`);
        }
        if (survey.id !== id) {
            throw new common_1.BadRequestException(`El id ${survey.id} de la encuesta no coincide con el id ${id} proporcionado en la URL`);
        }
        if (!await this.userExists(survey.userId)) {
            throw new common_1.BadRequestException(`El usuario con id ${survey.userId} no existe`);
        }
        const surveyDb = await this.dbService.survey.find({ title: survey.title.toUpperCase().trim() });
        if ((surveyDb !== null && surveyDb !== undefined) && surveyDb.id !== survey.id) {
            throw new common_1.BadRequestException(`La encuesta con título ${survey.title} ya existe`);
        }
        survey.title = survey.title.toUpperCase().trim();
        await this.dbService.survey.update(survey);
    }
    async updateSurveyState(id) {
        if (!await this.surveyExists({ id })) {
            throw new common_1.BadRequestException(`La encuesta con id ${id} no existe`);
        }
        const survey = await this.dbService.survey.getById(id);
        survey.isActive = !survey.isActive;
        await this.dbService.survey.update(survey);
    }
    async delete(id) {
        if (!await this.surveyExists({ id })) {
            throw new common_1.BadRequestException(`La encuesta con id ${id} no existe`);
        }
        await this.dbService.survey.delete(id);
    }
    async getSurveyResults(id) {
        if (!await this.surveyExists({ id })) {
            throw new common_1.BadRequestException(`La encuesta con id ${id} no existe`);
        }
        const survey = await this.dbService.survey.getById(id);
        const surveyAnswers = await this.dbService.answer.findMany({ surveyId: survey.id });
        const answersIds = surveyAnswers.map(answer => answer.id);
        const votes = await this.dbService.vote.findMany({ answerId: (0, typeorm_1.In)(answersIds) });
        const usersIds = votes.map(vote => vote.userId);
        const users = await this.dbService.user.findMany({ id: (0, typeorm_1.In)(usersIds) });
        const answersCount = this.countAnswersVotes(surveyAnswers, votes);
        const answersUsers = this.getAnswersUsers(surveyAnswers, votes, users);
        const answersShares = this.countAnswersShares(surveyAnswers, votes, users);
        return {
            answersCount,
            answersShares,
            answersUsers
        };
    }
    async getById(id) {
        return this.dbService.survey.getById(id);
    }
    async userExists(id) {
        const user = await this.dbService.user.getById(id);
        return (user !== undefined) && (user !== null);
    }
    async surveyExists(options) {
        const survey = await this.dbService.survey.find(options);
        return (survey !== undefined) && (survey !== null);
    }
    countAnswersVotes(answers, votes) {
        return answers.map(answer => {
            return {
                answer: answer.option,
                count: votes.filter(vote => vote.answerId === answer.id).length
            };
        });
    }
    countAnswersShares(answers, votes, users) {
        return answers.map(answer => {
            const answerVotes = votes.filter(vote => vote.answerId === answer.id);
            const usersVotes = users.filter(user => answerVotes.some(vote => vote.userId === user.id));
            let shares = 0;
            usersVotes.forEach(user => { shares += user.shares; });
            return { answer: answer.option, shares };
        });
    }
    getAnswersUsers(answers, votes, users) {
        return answers.map(answer => {
            const answerVotes = votes.filter(vote => vote.answerId === answer.id);
            const usersVotes = users.filter(user => answerVotes.some(vote => vote.userId === user.id));
            return usersVotes.map(user => {
                return {
                    answer: answer.option,
                    code: user.code,
                    name: user.name,
                    lastName: user.lastName,
                    shares: user.shares
                };
            });
        }).flat();
    }
};
exports.SurveyUseCases = SurveyUseCases;
exports.SurveyUseCases = SurveyUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_services_abstract_1.IDataServices])
], SurveyUseCases);
//# sourceMappingURL=survey.use-cases.js.map