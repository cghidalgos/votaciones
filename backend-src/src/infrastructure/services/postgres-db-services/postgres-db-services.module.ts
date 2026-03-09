import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresDbServicesService } from './postgres-db-services.service';
import { IDataServices } from 'src/domain/common/db-services.abstract';
import { User,Answer, Survey, Vote  } from 'src/domain/entities/';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'), 
        username: configService.get('DB_USERNAME'), 
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'), 
        entities: [User, Answer, Survey, Vote],
        synchronize: false, 
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Answer, Survey, Vote])
  ],
  providers: [{
    provide: IDataServices,
    useClass: PostgresDbServicesService
  }],
  exports: [IDataServices]
})
export class PostgresDbServicesModule {}

