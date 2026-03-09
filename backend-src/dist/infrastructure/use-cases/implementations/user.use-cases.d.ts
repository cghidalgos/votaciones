import { IUserUseCases } from "../../../application/interfaces/user.abstract.use-cases";
import { IDataServices } from "src/domain/common/db-services.abstract";
import { User } from "src/domain";
import { FindOptionsWhere } from "typeorm";
import { IBcryptService } from "src/domain/encryption";
export declare class UserUseCases implements IUserUseCases {
    private readonly dbService;
    private readonly bcryptServcie;
    constructor(dbService: IDataServices, bcryptServcie: IBcryptService);
    getAll(skip?: number, take?: number): Promise<User[]>;
    find(options: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User>;
    findManyByCode(code: string): Promise<User[]>;
    add(user: User): Promise<void>;
    addMany(users: User[]): Promise<void>;
    update(user: User, id: number): Promise<void>;
    delete(id: number): Promise<void>;
    getById(id: number): Promise<User>;
    updateState(code: string): Promise<void>;
    private userExists;
}
