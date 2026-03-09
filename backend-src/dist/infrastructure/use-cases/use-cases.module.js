"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCasesModule = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../../application/interfaces");
const implementations_1 = require("./implementations");
const services_1 = require("../services");
const jwt_module_1 = require("../services/jwt/jwt.module");
const bcrypt_module_1 = require("../services/bcrypt/bcrypt.module");
let UseCasesModule = class UseCasesModule {
};
exports.UseCasesModule = UseCasesModule;
exports.UseCasesModule = UseCasesModule = __decorate([
    (0, common_1.Module)({
        imports: [services_1.PostgresDbServicesModule, jwt_module_1.JwtTokenModule, bcrypt_module_1.BcryptModule],
        providers: [{
                provide: interfaces_1.IUserUseCases,
                useClass: implementations_1.UserUseCases
            },
            {
                provide: interfaces_1.ISurveyUseCases,
                useClass: implementations_1.SurveyUseCases
            },
            {
                provide: interfaces_1.IAnswerUseCases,
                useClass: implementations_1.AnswerUseCases
            },
            {
                provide: interfaces_1.IVoteUseCases,
                useClass: implementations_1.VoteUseCases
            }
        ],
        exports: [
            interfaces_1.IUserUseCases,
            interfaces_1.ISurveyUseCases,
            interfaces_1.IAnswerUseCases,
            interfaces_1.IVoteUseCases,
        ]
    })
], UseCasesModule);
//# sourceMappingURL=use-cases.module.js.map