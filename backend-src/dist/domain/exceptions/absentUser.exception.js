"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsentUserException = void 0;
const domain_exception_1 = require("./domain.exception");
class AbsentUserException extends domain_exception_1.DomainException {
    constructor() {
        super('User not present in the room');
    }
}
exports.AbsentUserException = AbsentUserException;
//# sourceMappingURL=absentUser.exception.js.map