import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, fromValue, mapFrom, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Survey } from 'src/domain/entities';
import { AddSurveyDto, SurveyDto, UpdateSurveyDto  } from 'src/infrastructure/DTOs';



@Injectable()
export class SurveyMapperService extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(){
    return (mapper:Mapper) =>{
        createMap(mapper, Survey, SurveyDto)
        createMap(mapper, SurveyDto, Survey)
        createMap(mapper, Survey, AddSurveyDto)
        createMap(mapper, AddSurveyDto, Survey)
        createMap(mapper, SurveyDto, UpdateSurveyDto)
        createMap(mapper, UpdateSurveyDto, SurveyDto)
    }
  }
}

