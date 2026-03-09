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
exports.Answer = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../common");
const classes_1 = require("@automapper/classes");
let Answer = class Answer extends common_1.EntityBase {
};
exports.Answer = Answer;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'survey_id' }),
    __metadata("design:type", Number)
], Answer.prototype, "surveyId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ name: 'option', length: 70 }),
    __metadata("design:type", String)
], Answer.prototype, "option", void 0);
exports.Answer = Answer = __decorate([
    (0, typeorm_1.Entity)({ name: 'Answer' })
], Answer);
//# sourceMappingURL=answer.entity.js.map