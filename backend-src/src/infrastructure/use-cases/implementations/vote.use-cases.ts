import { IVoteUseCases} from "../../../application/interfaces/vote.abstract.use-cases";
import { IDataServices } from "src/domain/common/db-services.abstract";
import { Answer, Survey, Vote } from "src/domain";
import { BadRequestException, Injectable } from "@nestjs/common";
import { FindOptionsWhere } from "typeorm";

@Injectable()
export class VoteUseCases implements IVoteUseCases {
  constructor(private readonly dbService: IDataServices) {}

    async getAll(): Promise<Vote[]> {
        return this.dbService.vote.getAll();
    }

    async find(options: FindOptionsWhere<Vote> | FindOptionsWhere<Vote>[] ): Promise<Vote> {
        return this.dbService.vote.find(options);
    }

    async findByAnswer(id: number): Promise<Vote[]> {
        if (!await this.answerExists({id})) {
            throw new BadRequestException(`La respuesta con id ${id} no existe`);
        }

        return this.dbService.vote.findMany({answerId: id});
    }

    async add(vote: Vote): Promise<void> {
        if (!await this.answerExists({id:vote.answerId})) {
            throw new BadRequestException(`La respuesta con id ${vote.answerId} no existe`);
        }

        if (!await this.userExists({id:vote.userId})) {
            throw new BadRequestException(`El usuario con id ${vote.userId} no existe`);
        }

        const surveyId = await this.getSurveyIdBy(vote.answerId);

        const survey = await this.dbService.survey.getById(surveyId);

        const user = await this.dbService.user.getById(vote.userId);

        if (!survey.isActive) {
            throw new BadRequestException(`La encuesta ${survey.title} no está activa`);
        }

        if (!user.isPresent) {
            throw new BadRequestException(`El usuario ${user.name} no está habilidato para votar. Por favor, contáctese cone el administrador del sistema.`);
        }

        const surveyAnswersIds = await this.getSurveyAnswersIds(surveyId);

        const userVote = await this.userHasVoted(surveyAnswersIds, vote.userId);

        if (userVote !== null && userVote !== undefined) {
            vote.id = userVote.id;
            await this.dbService.vote.update(vote);
            return;
        }

        await this.dbService.vote.add(vote);
    }

    async update(vote: Vote, id:number): Promise<void> {
        if (id !== vote.id) {
            throw new BadRequestException(`El id del voto ${vote.id} no coincide con el id ${id} proporcionado en la URL`);
        }

        if (!await this.voteExists({id})) {
            throw new BadRequestException(`El voto con id ${id} no existe`);
        }

        const voteDb = await this.dbService.vote.getById(id);

        vote.userId = voteDb.userId;

        if (!await this.answerExists({id:vote.answerId})) {
            throw new BadRequestException(`La respuesta con id ${vote.answerId} no existe`);
        }

        if (!await this.userExists({id:vote.userId})) {
            throw new BadRequestException(`El usuario con id ${vote.userId} no existe`);
        }

        await this.dbService.vote.update(vote);
    }

    async delete(id: number): Promise<void> {
        if (!await this.voteExists({id})) {
            throw new BadRequestException(`El voto con id ${id} no existe`);
        }


        await this.dbService.vote.delete(id);
    }

    async getById(id: number): Promise<Vote> {
        return this.dbService.vote.getById(id);
    }

    private async answerExists(options: Object): Promise<boolean> {
        const answer = await this.dbService.answer.find(options);
        return (answer !== undefined) && (answer !== null);
    }

    private async userExists(options: Object): Promise<boolean> {
        const user = await this.dbService.user.find(options);
        return (user !== undefined) && (user !== null);
    }

    private async voteExists(options: Object): Promise<boolean> {
        const vote = await this.dbService.vote.find(options);
        return (vote !== undefined) && (vote !== null);
    }

    private async getSurveyIdBy(answerId: number): Promise<number> {
        const answer = await this.dbService.answer.getById(answerId);
        return answer.surveyId;
    }

    private async getSurveyAnswersIds(surveyId: number): Promise<number[]> {
        const answers = await this.dbService.answer.findMany({surveyId});
        return answers.map(answer => answer.id);
    }


    private async userHasVoted(surveyAnswersIds: number[], userId: number): Promise<Vote> {
        const votes = await this.dbService.vote.findMany({userId});

        if (votes.length === 0) {return null;}

        const vote = votes.find(vote => surveyAnswersIds.includes(vote.answerId));

        return vote;
    }
}
