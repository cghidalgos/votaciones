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
exports.VoteMapperService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const common_1 = require("@nestjs/common");
const entities_1 = require("../../../../domain/entities");
const DTOs_1 = require("../../../DTOs");
let VoteMapperService = class VoteMapperService extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, entities_1.Vote, DTOs_1.AddVoteDto);
            (0, core_1.createMap)(mapper, DTOs_1.AddVoteDto, entities_1.Vote);
            (0, core_1.createMap)(mapper, entities_1.Vote, DTOs_1.VoteDto);
            (0, core_1.createMap)(mapper, DTOs_1.VoteDto, entities_1.Vote);
            (0, core_1.createMap)(mapper, DTOs_1.UpdateVoteDto, entities_1.Vote, (0, core_1.forMember)(dest => dest.userId, (0, core_1.fromValue)(0)));
            (0, core_1.createMap)(mapper, entities_1.Vote, DTOs_1.UpdateVoteDto);
        };
    }
};
exports.VoteMapperService = VoteMapperService;
exports.VoteMapperService = VoteMapperService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], VoteMapperService);
//# sourceMappingURL=votes-mapper.service.js.map