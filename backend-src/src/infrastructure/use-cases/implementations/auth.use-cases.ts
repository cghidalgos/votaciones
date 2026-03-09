import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IAuthUseCases } from "../../../application/interfaces/auth.abstract.use-cases";
import { AccesTokenDto, PayloadDto } from "src/domain/DTOs";
import { IJwtService } from "src/domain/jwt/jwt.abstract";
import { IDataServices } from "src/domain/common/db-services.abstract";
import {  User } from "src/domain";
import { IBcryptService } from "src/domain/encryption/bcrypt.abstract";

@Injectable()
export class AuthUseCases implements IAuthUseCases {
    constructor(
        private readonly jwtService: IJwtService,
        private readonly dbService: IDataServices,
        private readonly bcryptServcie: IBcryptService
    ) {}

    async logIn(code: string): Promise<AccesTokenDto> {
        const user = await this.getUserBy(code);

        const payload = this.getPayload(user);

        const token = await this.jwtService.createToken(payload);
        return { access_token: token };
    }

    async validate (password: string, hash: string,): Promise<boolean> {
        return await this.bcryptServcie.compare(password, hash);
    }


    public async getUserBy(code: string):Promise<User> {
        return this.dbService.user.find({ code });
    }

    private getPayload(user: User):PayloadDto {
        return{
            id: user.id,
            role: user.role,
        }
    }

}