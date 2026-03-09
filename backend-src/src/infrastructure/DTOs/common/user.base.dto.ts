import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsPositive, Matches, MaxLength, Min } from "class-validator";
import { Role } from "../../../domain/enums";
import { AutoMap } from "@automapper/classes";
import { BaseDto } from "./base.dto";

export class BaseUserDto extends BaseDto{
    @AutoMap()
    @IsNotEmpty({ message: 'Code is required'})
    @Matches(/^\d+$/, { message: 'Code must be numeric'})
    @MaxLength(30)
    code: string;

    @AutoMap()
    @IsNotEmpty()
    @MaxLength(20)
    name: string;

    @AutoMap()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string;

    @AutoMap()
    @IsInt()
    @Min(0)
    shares:number;

    @AutoMap()
    @IsNotEmpty()
    @IsEnum(Role)
    role: string;

    @AutoMap()
    @IsBoolean()
    isPresent: boolean;
}