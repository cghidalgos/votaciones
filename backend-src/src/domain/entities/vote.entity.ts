import { Column, Entity, Unique } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { EntityBase } from "../common";

@Entity({ name: 'Vote' })
@Unique("composite_key",['answerId', 'userId'])
export class Vote extends EntityBase{
  @AutoMap()
  @Column({ name: 'answer_id' })
  answerId: number;

  @AutoMap()
  @Column({ name: 'user_id' })
  userId: number;
}