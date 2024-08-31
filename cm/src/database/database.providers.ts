import { ConfigService } from '@nestjs/config';
import { DATA_SOURCE } from 'src/constants/constants';
import { DataSource } from 'typeorm';
import * as path from 'path';

export const checkDirname = () => console.log(__dirname);

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [path.join(__dirname, '../entities/*.entity.{js,ts}')], // Use path.join for cross-platform compatibility
        migrations: [path.join(__dirname, '../migrations/*.{js,ts}')],
        migrationsRun: true,
        synchronize: true,
      });

      try {
        return await dataSource.initialize();
      } catch (error) {
        console.error('Error initializing DataSource:', error);
        throw error; // Re-throw to let NestJS handle it
      }
    },
  },
];
