export declare class ExportSurveyDto {
    answersCount: {
        answer: string;
        count: number;
    }[];
    answersShares: {
        answer: string;
        shares: number;
    }[];
    answersUsers: {
        answer: string;
        code: string;
        name: string;
        lastName: string;
        shares: number;
    }[];
}
