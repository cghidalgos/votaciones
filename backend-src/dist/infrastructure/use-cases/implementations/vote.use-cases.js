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
exports.VoteUseCases = void 0;
const db_services_abstract_1 = require("../../../domain/common/db-services.abstract");
const common_1 = require("@nestjs/common");
let VoteUseCases = class VoteUseCases {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async getAll() {
        return this.dbService.vote.getAll();
    }
    async find(options) {
        return this.dbService.vote.find(options);
    }
    async findByAnswer(id) {
        if (!await this.answerExists({ id })) {
            throw new common_1.BadRequestException(`La respuesta con id ${id} no existe`);
        }
        return this.dbService.vote.findMany({ answerId: id });
    }
    async add(vote) {
        if (!await this.answerExists({ id: vote.answerId })) {
            throw new common_1.BadRequestException(`La respuesta con id ${vote.answerId} no existe`);
        }
        if (!await this.userExists({ id: vote.userId })) {
            throw new common_1.BadRequestException(`El usuario con id ${vote.userId} no existe`);
        }
        const surveyId = await this.getSurveyIdBy(vote.answerId);
        const survey = await this.dbService.survey.getById(surveyId);
        const user = await this.dbService.user.getById(vote.userId);
        if (!survey.isActive) {
            throw new common_1.BadRequestException(`La encuesta ${survey.title} no está activa`);
        }
        if (!user.isPresent) {
            throw new common_1.BadRequestException(`El usuario ${user.name} no está habilidato para votar. Por favor, contáctese cone el administrador del sistema.`);
        }
        const surveyAnswersIds = await this.getSurveyAnswersIds(surveyId);
        const userVote = await this.userHasVoted(surveyAnswersIds, vote.userId);
        if (userVote !== null && userVote !== undefined) {
            vote.id = userVote.id;
            await this.dbService.vote.update(vote);
            return;
        }
        await this.dbService.vote.add(vote);
    }
    async update(vote, id) {
        if (id !== vote.id) {
            throw new common_1.BadRequestException(`El id del voto ${vote.id} no coincide con el id ${id} proporcionado en la URL`);
        }
        if (!await this.voteExists({ id })) {
            throw new common_1.BadRequestException(`El voto con id ${id} no existe`);
        }
        const voteDb = await this.dbService.vote.getById(id);
        vote.userId = voteDb.userId;
        if (!await this.answerExists({ id: vote.answerId })) {
            throw new common_1.BadRequestException(`La respuesta con id ${vote.answerId} no existe`);
        }
        if (!await this.userExists({ id: vote.userId })) {
            throw new common_1.BadRequestException(`El usuario con id ${vote.userId} no existe`);
        }
        await this.dbService.vote.update(vote);
    }
    async delete(id) {
        if (!await this.voteExists({ id })) {
            throw new common_1.BadRequestException(`El voto con id ${id} no existe`);
        }
        await this.dbService.vote.delete(id);
    }
    async getById(id) {
        return this.dbService.vote.getById(id);
    }
    async answerExists(options) {
        const answer = await this.dbService.answer.find(options);
        return (answer !== undefined) && (answer !== null);
    }
    async userExists(options) {
        const user = await this.dbService.user.find(options);
        return (user !== undefined) && (user !== null);
    }
    async voteExists(options) {
        const vote = await this.dbService.vote.find(options);
        return (vote !== undefined) && (vote !== null);
    }
    async getSurveyIdBy(answerId) {
        const answer = await this.dbService.answer.getById(answerId);
        return answer.surveyId;
    }
    async getSurveyAnswersIds(surveyId) {
        const answers = await this.dbService.answer.findMany({ surveyId });
        return answers.map(answer => answer.id);
    }
    async userHasVoted(surveyAnswersIds, userId) {
        const votes = await this.dbService.vote.findMany({ userId });
        if (votes.length === 0) {
            return null;
        }
        const vote = votes.find(vote => surveyAnswersIds.includes(vote.answerId));
        return vote;
    }
};
exports.VoteUseCases = VoteUseCases;
exports.VoteUseCases = VoteUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_services_abstract_1.IDataServices])
], VoteUseCases);
//# sourceMappingURL=vote.use-cases.js.map