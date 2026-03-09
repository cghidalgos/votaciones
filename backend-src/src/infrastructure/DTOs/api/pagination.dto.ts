import { Transform } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto{

    @Transform(({value})=> Number(value))
    @IsInt()
    @IsOptional()
    @Min(0)
    skip?:number;

    @Transform(({value})=> Number(value))
    @IsInt()
    @IsOptional()
    @Min(1)
    take?:number;
}