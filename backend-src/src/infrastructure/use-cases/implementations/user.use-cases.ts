import { IUserUseCases } from "../../../application/interfaces/user.abstract.use-cases";
import { IDataServices } from "src/domain/common/db-services.abstract";
import { User } from "src/domain";
import { BadRequestException, Injectable } from "@nestjs/common";
import { FindOptionsWhere, In, Like } from "typeorm";
import { IBcryptService } from "src/domain/encryption";

@Injectable()
export class UserUseCases implements IUserUseCases {
  constructor(
    private readonly dbService: IDataServices,
    private readonly bcryptServcie: IBcryptService
  ) {}

    async getAll(skip?:number, take?:number): Promise<User[]> {
        return this.dbService.user.getAll(skip, take);
    }

    async find(options: FindOptionsWhere<User> | FindOptionsWhere<User>[] ): Promise<User> {
        return this.dbService.user.find(options);
    }

    async findManyByCode(code: string): Promise<User[]> {
        return this.dbService.user.findMany({code:Like(`%${code}%`)});
    }

    async add(user: User): Promise<void> {

        if (await this.userExists({code:user.code})) {
            throw new BadRequestException(`El usuario con el No de Cédula ${user.code} ya existe`);
        }

        user.password = await this.bcryptServcie.hash(user.password);

        await this.dbService.user.add(user);
    }

    async addMany(users: User[]): Promise<void> {
        const codes = users.map(user => user.code);
        const existingUsers = await this.dbService.user.findMany({code: In(codes)});

        if (existingUsers.length > 0) {
            throw new BadRequestException(`Algunos usuarios que intenta agregar ya existen en la base de datos`);
        }

        if (codes.length !== new Set(codes).size) {
            throw new BadRequestException(`No se pueden agregar usuarios con códigos duplicados`);
        }

        for (const user of users) {
            user.password = await this.bcryptServcie.hash(user.password);
        }

        await this.dbService.user.addMany(users);
    }

    async update(user: User, id:number): Promise<void> {

        if (!await this.userExists({id})) {
            throw new BadRequestException(`El usuario con el id ${id} no existe`);
        }

        if (user.id !== id) {

            throw new BadRequestException(`El id ${user.id} no coincide con el id ${id} proporcionado en la URL`);
        }

        const userDb = await this.dbService.user.find({id});

        if (userDb.code !== user.code && await this.userExists({code:user.code})) {
            throw new BadRequestException(`El usuario con el No de Cédula ${user.code} ya existe`);
        }


        if (user.password === null || user.password === undefined || user.password === "") {
            user.password = userDb.password;
            await this.dbService.user.update(user);
            return;
        }

        if(user.password.length < 8) {
            throw new BadRequestException(`La contraseña debe tener al menos 8 caracteres`);
        }

        const hash = userDb.password;

        const equalPasswords = await this.bcryptServcie.compare(user.password, hash);

        if (!equalPasswords) {
            user.password = await this.bcryptServcie.hash(user.password);
        }
        
        await this.dbService.user.update(user);
    }

    async delete(id: number): Promise<void> {

        if (!await this.userExists({id})) {
            throw new BadRequestException(`El usuario con id ${id} no existe`);
        }

        await this.dbService.user.delete(id);
    }

    async getById(id: number): Promise<User> {
        return this.dbService.user.getById(id);
    }

    async updateState(code: string): Promise<void> {

        if (!await this.userExists({code})) {
            throw new BadRequestException(`El usuario con el No de Cédula ${code} no existe`);
        }

        const user = await this.dbService.user.find({ code });

        user.isPresent = !user.isPresent;

        await this.dbService.user.update(user);
    }

    private async userExists(options: Object): Promise<boolean> {
        const user = await this.dbService.user.find(options);
        return user !== null ? true : false;
    }
}
