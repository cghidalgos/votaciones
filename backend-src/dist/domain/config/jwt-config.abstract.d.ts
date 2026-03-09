export declare abstract class IJwtConfigService {
    abstract getJwtSecret(): Promise<string>;
    abstract getJwtExpirationTime(): Promise<string>;
}
