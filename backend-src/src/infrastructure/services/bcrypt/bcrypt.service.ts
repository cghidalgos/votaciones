import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/encryption/bcrypt.abstract';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IBcryptService{
    private readonly rounds = 10;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.rounds);
    }
    async compare(password: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }
}
