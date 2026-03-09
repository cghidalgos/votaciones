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
exports.BaseUserDto = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../domain/enums");
const classes_1 = require("@automapper/classes");
const base_dto_1 = require("./base.dto");
class BaseUserDto extends base_dto_1.BaseDto {
}
exports.BaseUserDto = BaseUserDto;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Code is required' }),
    (0, class_validator_1.Matches)(/^\d+$/, { message: 'Code must be numeric' }),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], BaseUserDto.prototype, "code", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], BaseUserDto.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], BaseUserDto.prototype, "lastName", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BaseUserDto.prototype, "shares", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enums_1.Role),
    __metadata("design:type", String)
], BaseUserDto.prototype, "role", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseUserDto.prototype, "isPresent", void 0);
//# sourceMappingURL=user.base.dto.js.map