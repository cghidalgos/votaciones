import { OnApplicationBootstrap } from '@nestjs/common';
import { User, Answer, Survey, Vote } from 'src/domain';
import { IDataServices } from 'src/domain/common/db-services.abstract';
import { PostgresGenericRepository } from 'src/infrastructure/repositories/postgres-generic.repository';
import { Repository } from 'typeorm';
export declare class PostgresDbServicesService implements IDataServices, OnApplicationBootstrap {
    private readonly userRepository;
    private readonly answerRepository;
    private readonly surveyRepository;
    private readonly voteRepository;
    user: PostgresGenericRepository<User>;
    answer: PostgresGenericRepository<Answer>;
    survey: PostgresGenericRepository<Survey>;
    vote: PostgresGenericRepository<Vote>;
    constructor(userRepository: Repository<User>, answerRepository: Repository<Answer>, surveyRepository: Repository<Survey>, voteRepository: Repository<Vote>);
    onApplicationBootstrap(): void;
}
