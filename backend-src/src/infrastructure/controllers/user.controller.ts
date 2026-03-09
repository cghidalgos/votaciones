import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { IUserUseCases } from '../../application/interfaces';
import { AddUserDto, UserDto } from '../DTOs';
import { Mapper } from '@automapper/core';
import { User } from 'src/domain/entities';
import { InjectMapper } from '@automapper/nestjs';
import { UpdateUserDto } from '../DTOs/users';
import { JwtAuthGuard } from '../services';
import { RolesGuard } from '../services/jwt/guards/roles.guard';
import { Roles } from '../decorators';
import { Role } from 'src/domain/enums';
import { PaginationDto } from '../DTOs/api';


@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard)
@Controller('api/v1/users')
export class UserController {
    constructor(
        private readonly userUseCases: IUserUseCases,
        @InjectMapper() private readonly mapper: Mapper
    ) {}

    @Get()
    async getAllUsers(@Query() query: PaginationDto): Promise<UserDto[]>{
        const users = await this.userUseCases.getAll(query.skip, query.take);
        return this.mapper.mapArray(users, User, UserDto);
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<UserDto>{
        id = Number(id);
        const user = await this.userUseCases.getById(id);
        return this.mapper.map(user, User, UserDto);
    }

    @Get('code/:code')
    async findUsers(@Param('code') code: string): Promise<UserDto[]> {
        const users = await this.userUseCases.findManyByCode(code);
        return this.mapper.mapArray(users, User, UserDto);
    }

    @Post()
    async addUser(@Body() addUserDto: AddUserDto):Promise<void> {

        const user = this.mapper.map(addUserDto, AddUserDto, User);
        await this.userUseCases.add(user);
        return;
    }

    @Post('many')
    async addManyUsers(@Body() users: AddUserDto[]): Promise<void> {
        const usersMapped = this.mapper.mapArray(users, AddUserDto, User);
        await this.userUseCases.addMany(usersMapped);
        return;
    }

    @Put(':id')
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<void> {
        const user = this.mapper.map(updateUserDto, UpdateUserDto, User);
        await this.userUseCases.update(user, parseInt(id));
        return;
    }

    @HttpCode(204)
    @Patch(':code')
    async updateState(@Param('code') code: string) {
        await this.userUseCases.updateState(code);
        return;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        id = Number(id);
        await this.userUseCases.delete(id);
        return;
    }
}
