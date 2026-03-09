import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { IBcryptService } from 'src/domain/encryption/bcrypt.abstract';

@Module({
  providers: [{
    provide: IBcryptService,
    useClass: BcryptService
  }],
  exports: [IBcryptService]
})
export class BcryptModule {}
