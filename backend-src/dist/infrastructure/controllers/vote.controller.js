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
exports.VoteController = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../../application/interfaces");
const DTOs_1 = require("../DTOs");
const nestjs_1 = require("@automapper/nestjs");
const entities_1 = require("../../domain/entities");
const services_1 = require("../services");
const decorators_1 = require("../decorators");
let VoteController = class VoteController {
    constructor(voteUseCases, mapper) {
        this.voteUseCases = voteUseCases;
        this.mapper = mapper;
    }
    async getAnswerVotes(answerId) {
        const votes = await this.voteUseCases.findByAnswer(answerId);
        return this.mapper.mapArray(votes, entities_1.Vote, DTOs_1.VoteDto);
    }
    async addVote(vote, payload) {
        vote.userId = payload.id;
        await this.voteUseCases.add(this.mapper.map(vote, DTOs_1.VoteDto, entities_1.Vote));
    }
    async updateVote(id, vote) {
        id = Number(id);
        await this.voteUseCases.update(this.mapper.map(vote, DTOs_1.UpdateVoteDto, entities_1.Vote), id);
    }
    async deleteVote(id) {
        id = Number(id);
        await this.voteUseCases.delete(id);
    }
};
exports.VoteController = VoteController;
__decorate([
    (0, common_1.Get)('/answer/:answerId'),
    __param(0, (0, common_1.Param)('answerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "getAnswerVotes", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetPayload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_1.VoteDto, Object]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "addVote", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, DTOs_1.UpdateVoteDto]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "updateVote", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VoteController.prototype, "deleteVote", null);
exports.VoteController = VoteController = __decorate([
    (0, common_1.UseGuards)(services_1.JwtAuthGuard),
    (0, common_1.Controller)('api/v1/votes'),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [interfaces_1.IVoteUseCases, Object])
], VoteController);
//# sourceMappingURL=vote.controller.js.map