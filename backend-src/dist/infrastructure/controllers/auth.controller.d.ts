import { IAuthUseCases } from 'src/application';
import { AccesTokenDto } from 'src/domain/DTOs';
import { LogInUserDto } from '../DTOs';
export declare class AuthController {
    private readonly authUseCases;
    constructor(authUseCases: IAuthUseCases);
    login(logInUserDto: LogInUserDto): Promise<AccesTokenDto>;
}
