import { IJwtConfigService } from "src/domain/config";
import { ConfigService } from "@nestjs/config";
export declare class JwtConfigService implements IJwtConfigService {
    private readonly configService;
    constructor(configService: ConfigService);
    getJwtSecret(): Promise<string>;
    getJwtExpirationTime(): Promise<string>;
}
