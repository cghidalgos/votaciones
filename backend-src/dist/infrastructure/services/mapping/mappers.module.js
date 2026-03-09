"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappersModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_1 = require("@automapper/nestjs");
const classes_1 = require("@automapper/classes");
const user_mapper_service_1 = require("./mappers/user.mapper.service");
const answer_mapper_service_1 = require("./mappers/answer-mapper.service");
const votes_mapper_service_1 = require("./mappers/votes-mapper.service");
const survey_mapper_service_1 = require("./mappers/survey-mapper.service");
let MappersModule = class MappersModule {
};
exports.MappersModule = MappersModule;
exports.MappersModule = MappersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.AutomapperModule.forRoot({
                strategyInitializer: (0, classes_1.classes)()
            }),
        ],
        providers: [user_mapper_service_1.UserMapperService, answer_mapper_service_1.AnswerMapperService, votes_mapper_service_1.VoteMapperService, survey_mapper_service_1.SurveyMapperService]
    })
], MappersModule);
//# sourceMappingURL=mappers.module.js.map