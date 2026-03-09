import { AutoMap } from '@automapper/classes';
import { BaseUserDto } from '../common';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class AddUserDto extends BaseUserDto {
    @AutoMap()
    @IsNotEmpty()
    @MaxLength(64)
    password: string;

}