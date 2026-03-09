import { Column, Entity } from "typeorm";
import { EntityBase } from "../common";
import { AutoMap } from "@automapper/classes";

@Entity({ name: 'Survey' })
export class Survey extends EntityBase {
  @AutoMap()
  @Column({ length: 50 })
  title: string;

  @AutoMap()
  @Column({ length: 200 })
  statement: string;

  @AutoMap()
  @Column({ name: 'user_id' })
  userId: number;

  @AutoMap()
  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}