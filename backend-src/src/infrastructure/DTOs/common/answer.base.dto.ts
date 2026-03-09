import { AutoMap } from "@automapper/classes";
import { IsInt, IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { BaseDto } from "./base.dto";


export class AnswerBaseDto extends BaseDto{
    @IsNumber()
    @IsInt()
    @AutoMap()
    surveyId: number;

    @IsNotEmpty()
    @MaxLength(70)
    @AutoMap()
    option: string;
}