import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from 'src/domain/DTOs';
import { IJwtService } from 'src/domain/jwt/jwt.abstract';
export declare class JwtTokenService implements IJwtService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    checkToken(token: string): Promise<any>;
    createToken(payload: PayloadDto): Promise<string>;
}
