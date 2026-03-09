import { IBcryptService } from 'src/domain/encryption/bcrypt.abstract';
export declare class BcryptService implements IBcryptService {
    private readonly rounds;
    hash(password: string): Promise<string>;
    compare(password: string, hashPassword: string): Promise<boolean>;
}
