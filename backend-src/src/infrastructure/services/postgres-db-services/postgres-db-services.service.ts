import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Answer, Survey, Vote } from 'src/domain';
import { IDataServices } from 'src/domain/common/db-services.abstract';
import { PostgresGenericRepository } from 'src/infrastructure/repositories/postgres-generic.repository';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresDbServicesService implements IDataServices, OnApplicationBootstrap {
    user: PostgresGenericRepository<User>;
    answer: PostgresGenericRepository<Answer>;
    survey: PostgresGenericRepository<Survey>;
    vote: PostgresGenericRepository<Vote>;

    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>,
        @InjectRepository(Survey)
        private readonly surveyRepository: Repository<Survey>,
        @InjectRepository(Vote)
        private readonly voteRepository: Repository<Vote>
    ) {}

    onApplicationBootstrap() {
        this.user = new PostgresGenericRepository<User>(this.userRepository);
        this.answer = new PostgresGenericRepository<Answer>(this.answerRepository);
        this.survey = new PostgresGenericRepository<Survey>(this.surveyRepository);
        this.vote = new PostgresGenericRepository<Vote>(this.voteRepository);
    }
}
