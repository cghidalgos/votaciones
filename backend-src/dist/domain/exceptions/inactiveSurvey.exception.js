"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InactiveSurveyException = void 0;
const domain_exception_1 = require("./domain.exception");
class InactiveSurveyException extends domain_exception_1.DomainException {
    constructor() {
        super('This survey is not active');
    }
}
exports.InactiveSurveyException = InactiveSurveyException;
//# sourceMappingURL=inactiveSurvey.exception.js.map