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
exports.User = void 0;
const classes_1 = require("@automapper/classes");
const common_1 = require("../common");
const typeorm_1 = require("typeorm");
let User = class User extends common_1.EntityBase {
};
exports.User = User;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], User.prototype, "code", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'last_name', length: 50 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ length: 64 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Check)(`"shares" >= 0`),
    __metadata("design:type", Number)
], User.prototype, "shares", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ length: 5, default: 'voter' }),
    (0, typeorm_1.Check)(`"role" IN ('admin', 'voter')`),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'is_present', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isPresent", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'User' })
], User);
//# sourceMappingURL=user.entity.js.map