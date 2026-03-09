import { IAuthUseCases } from "../../../application/interfaces/auth.abstract.use-cases";
import { AccesTokenDto } from "src/domain/DTOs";
import { IJwtService } from "src/domain/jwt/jwt.abstract";
import { IDataServices } from "src/domain/common/db-services.abstract";
import { User } from "src/domain";
import { IBcryptService } from "src/domain/encryption/bcrypt.abstract";
export declare class AuthUseCases implements IAuthUseCases {
    private readonly jwtService;
    private readonly dbService;
    private readonly bcryptServcie;
    constructor(jwtService: IJwtService, dbService: IDataServices, bcryptServcie: IBcryptService);
    logIn(code: string): Promise<AccesTokenDto>;
    validate(password: string, hash: string): Promise<boolean>;
    getUserBy(code: string): Promise<User>;
    private getPayload;
}
