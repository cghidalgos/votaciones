import { AutoMap } from "@automapper/classes";
import { EntityBase } from "../common";
import { Entity, Column, Check } from 'typeorm';

@Entity({ name: 'User' })
export class User extends EntityBase {
    @AutoMap()
    @Column({ length: 30 })
    code: string;
  
    @AutoMap()
    @Column({ length: 20 })
    name: string;
  
    @AutoMap()
    @Column({ name: 'last_name', length: 50 })
    lastName: string;
  
    @AutoMap()
    @Column({ length: 64 })
    password: string;

    @AutoMap()
    @Column()
    @Check(`"shares" >= 0`)
    shares:number;
  
    @AutoMap()
    @Column({ length: 5, default: 'voter' })
    @Check(`"role" IN ('admin', 'voter')`)
    role: string;
  
    @AutoMap()
    @Column({ name: 'is_present', default: true })
    isPresent: boolean;
}