import { Max, MaxLength } from "class-validator";
import { BaseUserDto } from "../common";
import { AutoMap } from "@automapper/classes";


export class UpdateUserDto extends BaseUserDto {
    @AutoMap()
    @MaxLength(64)
    password: string;

}