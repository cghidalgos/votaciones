import { AutomapperProfile } from '@automapper/nestjs';
import { type Mapper } from '@automapper/core';
export declare class SurveyMapperService extends AutomapperProfile {
    constructor(mapper: Mapper);
    get profile(): (mapper: Mapper) => void;
}
