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
exports.SurveyBaseDto = void 0;
const classes_1 = require("@automapper/classes");
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
class SurveyBaseDto extends base_dto_1.BaseDto {
}
exports.SurveyBaseDto = SurveyBaseDto;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SurveyBaseDto.prototype, "title", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], SurveyBaseDto.prototype, "statement", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SurveyBaseDto.prototype, "userId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SurveyBaseDto.prototype, "isActive", void 0);
//# sourceMappingURL=survey.base.dto.js.map