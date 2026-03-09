import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, fromValue, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Vote } from 'src/domain/entities';
import { AddVoteDto, UpdateVoteDto, VoteDto } from 'src/infrastructure/DTOs';

@Injectable()
export class VoteMapperService extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(){
    return (mapper:Mapper) =>{
        createMap(mapper, Vote, AddVoteDto)
        createMap(mapper, AddVoteDto, Vote)
        createMap(mapper, Vote, VoteDto)
        createMap(mapper, VoteDto, Vote)
        createMap(mapper, UpdateVoteDto, Vote, 
            forMember(
              dest => dest.userId,
              fromValue(0),
            ),
          )
        createMap(mapper, Vote, UpdateVoteDto)
    }
  }




}
