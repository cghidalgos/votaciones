import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


import { PayloadDto } from 'src/domain/DTOs'; 
import { IJwtService } from 'src/domain/jwt/jwt.abstract';

@Injectable()
export class JwtTokenService implements IJwtService {

    constructor(private readonly jwtService: JwtService) {}

    async checkToken(token: string): Promise<any> {
        return this.jwtService.verify(token);

    }
    async createToken(payload: PayloadDto): Promise<string> {
        return this.jwtService.sign(payload);
    }
    
}
