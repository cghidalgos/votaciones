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
exports.AuthUseCases = void 0;
const common_1 = require("@nestjs/common");
const jwt_abstract_1 = require("../../../domain/jwt/jwt.abstract");
const db_services_abstract_1 = require("../../../domain/common/db-services.abstract");
const bcrypt_abstract_1 = require("../../../domain/encryption/bcrypt.abstract");
let AuthUseCases = class AuthUseCases {
    constructor(jwtService, dbService, bcryptServcie) {
        this.jwtService = jwtService;
        this.dbService = dbService;
        this.bcryptServcie = bcryptServcie;
    }
    async logIn(code) {
        const user = await this.getUserBy(code);
        const payload = this.getPayload(user);
        const token = await this.jwtService.createToken(payload);
        return { access_token: token };
    }
    async validate(password, hash) {
        return await this.bcryptServcie.compare(password, hash);
    }
    async getUserBy(code) {
        return this.dbService.user.find({ code });
    }
    getPayload(user) {
        return {
            id: user.id,
            role: user.role,
        };
    }
};
exports.AuthUseCases = AuthUseCases;
exports.AuthUseCases = AuthUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_abstract_1.IJwtService,
        db_services_abstract_1.IDataServices,
        bcrypt_abstract_1.IBcryptService])
], AuthUseCases);
//# sourceMappingURL=auth.use-cases.js.map