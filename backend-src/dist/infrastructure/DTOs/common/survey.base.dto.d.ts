import { BaseDto } from "./base.dto";
export declare class SurveyBaseDto extends BaseDto {
    title: string;
    statement: string;
    userId: number;
    isActive: boolean;
}
