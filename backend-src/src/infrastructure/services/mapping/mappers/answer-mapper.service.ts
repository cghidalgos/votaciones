import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, fromValue, mapFrom, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Answer } from 'src/domain/entities';
import { AnswerDto  } from 'src/infrastructure/DTOs';



@Injectable()
export class AnswerMapperService extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(){
    return (mapper:Mapper) =>{
        createMap(mapper, Answer, AnswerDto)
        createMap(mapper, AnswerDto, Answer)
    }
  }




}

