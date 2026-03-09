import { BaseDto } from "./base.dto";
export declare class BaseUserDto extends BaseDto {
    code: string;
    name: string;
    lastName: string;
    shares: number;
    role: string;
    isPresent: boolean;
}
