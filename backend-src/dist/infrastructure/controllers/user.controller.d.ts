import { IUserUseCases } from '../../application/interfaces';
import { AddUserDto, UserDto } from '../DTOs';
import { Mapper } from '@automapper/core';
import { UpdateUserDto } from '../DTOs/users';
import { PaginationDto } from '../DTOs/api';
export declare class UserController {
    private readonly userUseCases;
    private readonly mapper;
    constructor(userUseCases: IUserUseCases, mapper: Mapper);
    getAllUsers(query: PaginationDto): Promise<UserDto[]>;
    getUser(id: number): Promise<UserDto>;
    findUsers(code: string): Promise<UserDto[]>;
    addUser(addUserDto: AddUserDto): Promise<void>;
    addManyUsers(users: AddUserDto[]): Promise<void>;
    updateUser(updateUserDto: UpdateUserDto, id: string): Promise<void>;
    updateState(code: string): Promise<void>;
    deleteUser(id: number): Promise<void>;
}
