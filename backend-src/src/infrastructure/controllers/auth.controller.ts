import { Body, Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import { IAuthUseCases } from 'src/application';
import { AccesTokenDto } from 'src/domain/DTOs';
import { LocalAuthGuard } from '../services';
import { LogInUserDto } from '../DTOs';

@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private readonly authUseCases: IAuthUseCases
    ) {}

    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Body() logInUserDto:LogInUserDto):Promise<AccesTokenDto> {
        return await this.authUseCases.logIn(logInUserDto.code);
    }
}
