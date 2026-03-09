import { IVoteUseCases } from "../../../application/interfaces/vote.abstract.use-cases";
import { IDataServices } from "src/domain/common/db-services.abstract";
import { Vote } from "src/domain";
import { FindOptionsWhere } from "typeorm";
export declare class VoteUseCases implements IVoteUseCases {
    private readonly dbService;
    constructor(dbService: IDataServices);
    getAll(): Promise<Vote[]>;
    find(options: FindOptionsWhere<Vote> | FindOptionsWhere<Vote>[]): Promise<Vote>;
    findByAnswer(id: number): Promise<Vote[]>;
    add(vote: Vote): Promise<void>;
    update(vote: Vote, id: number): Promise<void>;
    delete(id: number): Promise<void>;
    getById(id: number): Promise<Vote>;
    private answerExists;
    private userExists;
    private voteExists;
    private getSurveyIdBy;
    private getSurveyAnswersIds;
    private userHasVoted;
}
