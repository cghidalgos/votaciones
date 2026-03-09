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
exports.UserMapperService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const common_1 = require("@nestjs/common");
const entities_1 = require("../../../../domain/entities");
const DTOs_1 = require("../../../DTOs");
const users_1 = require("../../../DTOs/users");
let UserMapperService = class UserMapperService extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, entities_1.User, DTOs_1.AddUserDto);
            (0, core_1.createMap)(mapper, DTOs_1.AddUserDto, entities_1.User, (0, core_1.forMember)(dest => dest.id, (0, core_1.fromValue)(0)));
            (0, core_1.createMap)(mapper, entities_1.User, users_1.UpdateUserDto);
            (0, core_1.createMap)(mapper, users_1.UpdateUserDto, entities_1.User);
            (0, core_1.createMap)(mapper, entities_1.User, DTOs_1.UserDto);
        };
    }
};
exports.UserMapperService = UserMapperService;
exports.UserMapperService = UserMapperService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], UserMapperService);
//# sourceMappingURL=user.mapper.service.js.map