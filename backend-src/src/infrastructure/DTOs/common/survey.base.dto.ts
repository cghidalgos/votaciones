import { AutoMap } from "@automapper/classes";
import { IsBoolean, IsInt, IsNotEmpty, MaxLength } from "class-validator";
import { BaseDto } from "./base.dto";

export class SurveyBaseDto extends BaseDto{
    @AutoMap()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @AutoMap()
    @IsNotEmpty()
    @MaxLength(200)
    statement: string;

    @AutoMap()
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @AutoMap()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}