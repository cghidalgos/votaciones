import { Column, Entity } from "typeorm";
import { EntityBase } from "../common";
import { AutoMap } from "@automapper/classes";

@Entity({ name: 'Answer' })
export class Answer extends EntityBase {
    @AutoMap()
    @Column({ name: 'survey_id' })
    surveyId: number;
    
    @AutoMap()
    @Column({ name: 'option', length: 70 })
    option: string;
}