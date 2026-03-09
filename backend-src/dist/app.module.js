"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const use_cases_module_1 = require("./infrastructure/use-cases/use-cases.module");
const infrastructure_1 = require("./infrastructure");
const controllers_1 = require("./infrastructure/controllers");
const jwt_module_1 = require("./infrastructure/services/jwt/jwt.module");
const bcrypt_module_1 = require("./infrastructure/services/bcrypt/bcrypt.module");
const mappers_module_1 = require("./infrastructure/services/mapping/mappers.module");
const auth_controller_1 = require("./infrastructure/controllers/auth.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            use_cases_module_1.UseCasesModule,
            infrastructure_1.PostgresDbServicesModule,
            jwt_module_1.JwtTokenModule,
            bcrypt_module_1.BcryptModule,
            mappers_module_1.MappersModule
        ],
        controllers: [
            app_controller_1.AppController,
            controllers_1.UserController,
            controllers_1.AnswerController,
            controllers_1.VoteController,
            controllers_1.SurveyController,
            auth_controller_1.AuthController
        ],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map