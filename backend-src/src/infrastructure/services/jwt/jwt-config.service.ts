import { IJwtConfigService } from "src/domain/config";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtConfigService implements IJwtConfigService {

    constructor(
        private readonly configService: ConfigService,
    ) {}

    async getJwtSecret(): Promise<string> {
        return this.configService.get<string>('JWT_SECRET');
      
    }

    async getJwtExpirationTime(): Promise<string> {
      return this.configService.get<string>('JWT_EXPIRATION_TIME');
    }

}