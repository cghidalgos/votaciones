import { PayloadDto } from "../DTOs"; 

export abstract class IJwtService {
    abstract checkToken(token: string): Promise<any>;
    abstract createToken(payload: PayloadDto): Promise<string>;
  }