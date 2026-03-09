import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, fromValue, mapWith, type Mapper, condition } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities';
import { AddUserDto, UserDto } from 'src/infrastructure/DTOs';
import { UpdateUserDto } from 'src/infrastructure/DTOs/users';



@Injectable()
export class UserMapperService extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(){
    return (mapper:Mapper) =>{
        createMap(mapper, User, AddUserDto)
        createMap(mapper, AddUserDto, User,
            forMember(
              dest => dest.id,
              fromValue(0),
            ),
          )
        createMap(mapper, User, UpdateUserDto)
        createMap(mapper, UpdateUserDto, User)
        createMap(mapper, User, UserDto)
    }
  }




}
