import { EntityBase } from "../common";
export declare class User extends EntityBase {
    code: string;
    name: string;
    lastName: string;
    password: string;
    shares: number;
    role: string;
    isPresent: boolean;
}
