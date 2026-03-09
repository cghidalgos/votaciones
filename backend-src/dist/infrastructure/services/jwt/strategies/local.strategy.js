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
var LocalStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const jwt_1 = require("../../../../domain/jwt");
const common_2 = require("@nestjs/common");
let LocalStrategy = LocalStrategy_1 = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: 'code',
            passwordField: 'password',
        });
        this.authService = authService;
        this.logger = new common_2.Logger(LocalStrategy_1.name);
    }
    async validate(code, password) {
        const user = await this.authService.getUserBy(code);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const hash = user.password;
        const isPasswordValid = await this.authService.validate(password, hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = LocalStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.IAuthUseCases])
], LocalStrategy);
//# sourceMappingURL=local.strategy.js.map