import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DATA_SOURCE } from 'src/constants/constants';

@Module({
  providers: [
    ...databaseProviders
  ],
  exports: [
    ...databaseProviders,
  ],
})
export class DatabaseModule {}