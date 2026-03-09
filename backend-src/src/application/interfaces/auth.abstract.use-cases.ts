import { User } from "src/domain/entities";
import { AccesTokenDto } from "../../domain/DTOs";

export abstract class IAuthUseCases {
  abstract logIn(code: string): Promise<AccesTokenDto>;
  abstract validate(hash: string, password: string): Promise<boolean>;
  abstract getUserBy(code: string): Promise<User>;
}