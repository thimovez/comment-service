import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  POSTGRES_LOGGER_NAME,
  POSTGRES_TYPE_NAME,
} from '../constants/constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: POSTGRES_TYPE_NAME,
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD', 'root'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [path.join(__dirname, '/entities/*.entity.{js,ts}')],
        migrations: [path.join(__dirname, '/migrations/*.{js,ts}')],
        synchronize: configService.get<boolean>('POSTGRES_SYNCHRONIZE'),
        migrationsRun: true,
        logging: ['migration'],
      }),

      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);
        await dataSource.initialize();

        const logger = new Logger(POSTGRES_LOGGER_NAME);
        const pgOptions = options as PostgresConnectionOptions;

        if (dataSource.isInitialized) {
          logger.log(
            `Postgres Database connected: ${pgOptions.database} at ${pgOptions.host}:${pgOptions.port}`,
          );
        }

        return dataSource;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresConnectionModule {}