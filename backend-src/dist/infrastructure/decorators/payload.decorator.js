"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPayload = void 0;
const common_1 = require("@nestjs/common");
exports.GetPayload = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request === null || request === void 0 ? void 0 : request.user[data] : request.user;
});
//# sourceMappingURL=payload.decorator.js.map