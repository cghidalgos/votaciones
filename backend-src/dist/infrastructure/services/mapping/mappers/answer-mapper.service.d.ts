import { AutomapperProfile } from '@automapper/nestjs';
import { type Mapper } from '@automapper/core';
export declare class AnswerMapperService extends AutomapperProfile {
    constructor(mapper: Mapper);
    get profile(): (mapper: Mapper) => void;
}
