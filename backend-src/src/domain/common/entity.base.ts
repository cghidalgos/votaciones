import { AutoMap } from "@automapper/classes";
import { PrimaryGeneratedColumn } from "typeorm";

export class EntityBase {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;
}