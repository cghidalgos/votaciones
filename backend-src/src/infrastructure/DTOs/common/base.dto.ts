import { AutoMap } from "@automapper/classes";
import { IsInt, IsNotEmpty } from "class-validator";


export class BaseDto {
    @IsNotEmpty()
    @IsInt()
    @AutoMap()
    id: number;
}