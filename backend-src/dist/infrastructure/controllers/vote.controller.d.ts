import { IVoteUseCases } from '../../application/interfaces';
import { UpdateVoteDto, VoteDto } from '../DTOs';
import { Mapper } from '@automapper/core';
import { PayloadDto } from 'src/domain/DTOs';
export declare class VoteController {
    private readonly voteUseCases;
    private readonly mapper;
    constructor(voteUseCases: IVoteUseCases, mapper: Mapper);
    getAnswerVotes(answerId: number): Promise<VoteDto[]>;
    addVote(vote: VoteDto, payload: PayloadDto): Promise<void>;
    updateVote(id: number, vote: UpdateVoteDto): Promise<void>;
    deleteVote(id: number): Promise<void>;
}
