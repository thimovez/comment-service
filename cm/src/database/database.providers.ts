import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const checkDirname = () => console.log(__dirname);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [__dirname + './entities/*.entity.{js,ts}',],
        migrations: [__dirname + './migrations/*.{js,ts}'],
        migrationsRun: true,
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];