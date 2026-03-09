import { Answer, Survey, User, Vote } from '../entities';
import { IRepository } from './repository.abstract';
export declare abstract class IDataServices {
    abstract user: IRepository<User>;
    abstract answer: IRepository<Answer>;
    abstract survey: IRepository<Survey>;
    abstract vote: IRepository<Vote>;
}
