"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDbServicesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const postgres_db_services_service_1 = require("./postgres-db-services.service");
const db_services_abstract_1 = require("../../../domain/common/db-services.abstract");
const entities_1 = require("../../../domain/entities");
let PostgresDbServicesModule = class PostgresDbServicesModule {
};
exports.PostgresDbServicesModule = PostgresDbServicesModule;
exports.PostgresDbServicesModule = PostgresDbServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [entities_1.User, entities_1.Answer, entities_1.Survey, entities_1.Vote],
                    synchronize: false,
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([entities_1.User, entities_1.Answer, entities_1.Survey, entities_1.Vote])
        ],
        providers: [{
                provide: db_services_abstract_1.IDataServices,
                useClass: postgres_db_services_service_1.PostgresDbServicesService
            }],
        exports: [db_services_abstract_1.IDataServices]
    })
], PostgresDbServicesModule);
//# sourceMappingURL=postgres-db-services.module.js.map