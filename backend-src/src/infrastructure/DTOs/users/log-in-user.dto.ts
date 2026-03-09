import { IsNotEmpty, MaxLength } from "class-validator";

export class LogInUserDto {
    @IsNotEmpty()
    @MaxLength(30)
    code:string;

    @IsNotEmpty()
    @MaxLength(64)
    password:string;
}