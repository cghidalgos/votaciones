import { ISurveyUseCases } from "../../../application/interfaces/survey.abstract.use-cases";
import { IDataServices } from "src/domain/common/db-services.abstract";
import { Answer, Survey, Vote, User } from "src/domain";
import { BadRequestException, Injectable } from "@nestjs/common";
import { FindOptionsWhere, In, Like } from "typeorm";
import { ExportSurveyDto } from "src/infrastructure/DTOs/survey/export-survey.dto";

@Injectable()
export class SurveyUseCases implements ISurveyUseCases {
  constructor(private readonly dbService: IDataServices) {}

    async getAll(skip?:number, take?:number): Promise<Survey[]> {
        return this.dbService.survey.getAll(skip, take);
    }

    async find(options: FindOptionsWhere<Survey> | FindOptionsWhere<Survey>[] ): Promise<Survey> {
        return this.dbService.survey.find(options);
    }

    async findSurveysBy(title: string): Promise<Survey[]> {
        return this.dbService.survey.findMany(
            {title:Like(`%${title.toUpperCase().trim()}%`)}
        );
    }

    async add(survey: Survey): Promise<number> {
        if(!await this.userExists(survey.userId)) {
            throw new BadRequestException(`El usuario con id ${survey.userId} no existe`);
        }

        if(await this.surveyExists({title:survey.title.toUpperCase().trim()})) {
            throw new BadRequestException(`La encuesta con título ${survey.title} ya existe`);
        }

        survey.title = survey.title.toUpperCase().trim();

        await this.dbService.survey.add(survey);

        return survey.id;
    }

    async update(survey: Survey, id:number): Promise<void> {
        if (!await this.surveyExists({id:survey.id})) {
            throw new BadRequestException(`La encuesta con id ${survey.id} no existe`);
        }

        if (survey.id !== id) {
            throw new BadRequestException(`El id ${survey.id} de la encuesta no coincide con el id ${id} proporcionado en la URL`);
        }

        if (!await this.userExists(survey.userId)) {
            throw new BadRequestException(`El usuario con id ${survey.userId} no existe`);
        }

        const surveyDb = await this.dbService.survey.find({title:survey.title.toUpperCase().trim()});

        if((surveyDb!==null && surveyDb!==undefined) && surveyDb.id !== survey.id) {
            throw new BadRequestException(`La encuesta con título ${survey.title} ya existe`);
        }

        survey.title = survey.title.toUpperCase().trim();

        await this.dbService.survey.update(survey);
    }

    async updateSurveyState(id:number):Promise<void> {
        if (!await this.surveyExists({id})) {
            throw new BadRequestException(`La encuesta con id ${id} no existe`);
        }

        const survey = await this.dbService.survey.getById(id);

        survey.isActive = !survey.isActive;

        await this.dbService.survey.update(survey);
    }

    async delete(id: number): Promise<void> {
        if (!await this.surveyExists({id})) {
            throw new BadRequestException(`La encuesta con id ${id} no existe`);
        }

        await this.dbService.survey.delete(id);
    }

    async getSurveyResults(id: number): Promise<ExportSurveyDto> {
        if (!await this.surveyExists({id})) {
            throw new BadRequestException(`La encuesta con id ${id} no existe`);
        }

        const survey = await this.dbService.survey.getById(id);

        const surveyAnswers = await this.dbService.answer.findMany({surveyId:survey.id});
        
        const answersIds = surveyAnswers.map(answer => answer.id);

        const votes = await this.dbService.vote.findMany({answerId:In(answersIds)});

        const usersIds = votes.map(vote => vote.userId);

        const users = await this.dbService.user.findMany({id:In(usersIds)});

        const answersCount = this.countAnswersVotes(surveyAnswers, votes);

        const answersUsers = this.getAnswersUsers(surveyAnswers, votes, users);

        const answersShares = this.countAnswersShares(surveyAnswers, votes, users);

        return {
            answersCount,
            answersShares,
            answersUsers
        };
    }

    async getById(id: number): Promise<Survey> {
        return this.dbService.survey.getById(id);
    }

    private async userExists(id: number): Promise<boolean> {
        const user = await this.dbService.user.getById(id);

        return (user !== undefined) && (user !== null);
    }

    private async surveyExists(options:Object): Promise<boolean> {
        const survey = await this.dbService.survey.find(options);

        return (survey !== undefined) && (survey !== null);
    }

    private countAnswersVotes(answers: Answer[], votes: any[]) {
        return answers.map(answer => {
            return {
                answer: answer.option,
                count: votes.filter(vote => vote.answerId === answer.id).length
            }
        });
    }

    private countAnswersShares(answers: Answer[], votes: Vote[], users: User[]){
        return answers.map(answer =>{
            const answerVotes = votes.filter(vote => vote.answerId === answer.id);
            const usersVotes = users.filter(user => answerVotes.some(vote => vote.userId === user.id));
            let shares = 0;
            usersVotes.forEach(user=>{shares+=user.shares;})

            return {answer: answer.option, shares}
        })
    }

    private getAnswersUsers(answers: Answer[], votes: Vote[], users: User[]) {
        return answers.map(answer => {
            const answerVotes = votes.filter(vote => vote.answerId === answer.id);
            const usersVotes = users.filter(user => answerVotes.some(vote => vote.userId === user.id));
            return usersVotes.map(user => {
                return {
                    answer: answer.option,
                    code: user.code,
                    name: user.name,
                    lastName: user.lastName,
                    shares:user.shares
                }
            });
        }).flat();
    }

}
