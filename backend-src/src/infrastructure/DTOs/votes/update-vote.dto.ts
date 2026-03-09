import { AutoMap } from "@automapper/classes";
import { BaseDto } from "../common/base.dto";
import { IsNotEmpty, IsInt } from "class-validator";

export class UpdateVoteDto extends BaseDto{
    @AutoMap()
    @IsInt()
    @IsNotEmpty()
    answerId: number;

}