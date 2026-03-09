import { Strategy } from 'passport-local';
import { IAuthUseCases } from '../../../../domain/jwt';
import { User } from 'src/domain/entities';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private readonly logger;
    constructor(authService: IAuthUseCases);
    validate(code: string, password: string): Promise<User>;
}
export {};
