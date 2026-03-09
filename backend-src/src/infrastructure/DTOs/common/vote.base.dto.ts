import { AutoMap } from "@automapper/classes";
import { IsInt, IsNotEmpty } from "class-validator";
import { BaseDto } from "./base.dto";

export class VoteBaseDto extends BaseDto{
    @AutoMap()
    @IsInt()
    @IsNotEmpty()
    answerId: number;

    @AutoMap()
    @IsInt()
    @IsNotEmpty()
    userId: number;
}