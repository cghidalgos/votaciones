import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IVoteUseCases } from '../../application/interfaces';
import { UpdateVoteDto, VoteDto } from '../DTOs';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Vote } from 'src/domain/entities';
import { JwtAuthGuard } from '../services';
import { GetPayload } from '../decorators';
import { PayloadDto } from 'src/domain/DTOs';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/votes')
export class VoteController {
    constructor(
        private readonly voteUseCases: IVoteUseCases,
        @InjectMapper() private readonly mapper: Mapper
        ) {}

    @Get('/answer/:answerId')
    async getAnswerVotes(@Param('answerId') answerId: number): Promise<VoteDto[]>{
        const votes = await this.voteUseCases.findByAnswer(answerId);
        return this.mapper.mapArray(votes, Vote, VoteDto);
    }

    @Post()
    async addVote(@Body()vote: VoteDto, @GetPayload() payload:PayloadDto): Promise<void>{
        vote.userId = payload.id;
        await this.voteUseCases.add(this.mapper.map(vote, VoteDto, Vote));
    }

    @Patch('/:id')
    async updateVote(@Param('id') id: number, @Body()vote: UpdateVoteDto): Promise<void>{
        id = Number(id);
        await this.voteUseCases.update(this.mapper.map(vote, UpdateVoteDto, Vote), id);
    }

    @Delete('/:id')
    async deleteVote(@Param('id') id: number): Promise<void>{
        id = Number(id);
        await this.voteUseCases.delete(id);
    }
}
