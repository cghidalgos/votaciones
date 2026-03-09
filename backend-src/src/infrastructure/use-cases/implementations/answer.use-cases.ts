import { BadRequestException, Injectable } from "@nestjs/common";
import { IAnswerUseCases } from "../../../application/interfaces/answer.abstract.use-cases";
import { Answer } from "src/domain";
import { IDataServices } from "src/domain/common/db-services.abstract";
import { FindOptionsWhere, In } from "typeorm";

@Injectable()
export class AnswerUseCases implements IAnswerUseCases {
  constructor(private readonly dbService: IDataServices) {}

    async getAll(): Promise<Answer[]> {
        return this.dbService.answer.getAll();
    }

    async find(options: FindOptionsWhere<Answer> | FindOptionsWhere<Answer>[] ): Promise<Answer> {
        return this.dbService.answer.find(options);
    }

    async findBySurvey(id:number): Promise<Answer[]> {
        const survey = await this.dbService.survey.getById(id);

        if (!survey) {
            throw new BadRequestException(`La encuesta con id ${id} no existe`);
        }

        return this.dbService.answer.findMany({surveyId:id});
    }

    async add(answer: Answer): Promise<void> {

        if (!await this.surveyExists(answer.surveyId)) {
            throw new BadRequestException(`La encuesta con id ${answer.surveyId} no existe`);
        }

        await this.dbService.answer.add(answer);
    }

    async addMany(answers: Answer[]): Promise<Answer[]>{
        const surveyIds = answers.map(answer => answer.surveyId);

        if(!this.areAllEqual(surveyIds)) {
            throw new BadRequestException(`Las respuestas deben pertenecer a una mismas encuesta`);
        }

        if (!await this.surveyExists(surveyIds[0])) {
            throw new BadRequestException(`La encuesta con id ${surveyIds[0]} no existe`);
        }

        return await this.dbService.answer.addMany(answers);
    }

    async update(answer: Answer, id:number): Promise<void> {

        if(answer.id !== id) {
            throw new BadRequestException(`El id ${answer.id} de la respuesta no coincide con el id ${id} proporcionado en la URL`);
        }

        if (!await this.answerExists(answer.id)) {
            throw new BadRequestException(`La respuesta con id ${answer.id} no existe`);
        }

        const answerDb = await this.dbService.answer.getById(answer.id);

        const equalsSurvey = answerDb.surveyId === answer.surveyId;

        if (!equalsSurvey) {
            throw new BadRequestException(`La respuesta con el id ${answer.id} no pertenece a la encuesta con id ${answer.surveyId}`);
        }

        if(!await this.surveyExists(answer.surveyId)) {
            throw new BadRequestException(`La encuesta con id ${answer.surveyId} no existe`);
        }

        await this.dbService.answer.update(answer);
    }

    async updateMany(answers: Answer[]): Promise<Answer[]> {
        const surveyIds = answers.map(answer => answer.surveyId);

        if(!this.areAllEqual(surveyIds)) {
            throw new BadRequestException(`Las respuestas deben pertenecer a una mismas encuesta`);
        }

        if (!await this.surveyExists(surveyIds[0])) {
            throw new BadRequestException(`La encuesta con id ${surveyIds[0]} no existe`);
        }

        const answersIds = answers.map(answer => answer.id);

        const answersToUpdateDb = await this.dbService.answer.findMany({id:In(answersIds)});

        if(answersToUpdateDb.length !== answersIds.length) {
            throw new BadRequestException(`Alguna de las respuestas proporcionadas no existe en la base de datos`);
        }

        return await this.dbService.answer.updateMany(answers);
    }

    async delete(id: number): Promise<void> {

        if (!await this.answerExists(id)) {
            throw new BadRequestException(`La respuesta con id ${id} no existe`);
        }

        await this.dbService.answer.delete(id);
    }

    async getById(id: number): Promise<Answer> {
        return this.dbService.answer.getById(id);
    }

    private async surveyExists(id: number): Promise<boolean> {
        const survey = await this.dbService.survey.getById(id);

        return (survey !== undefined) && (survey !== null);
    }


    private async answerExists(id: number): Promise<boolean> {
        const answer = await this.dbService.answer.getById(id);

        return (answer !== undefined) && (answer !== null);
    }

    private areAllEqual(arr: number[]): boolean {
        return new Set(arr).size === 1;
    }
}
