import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/database.config';

@Module({
  imports: [
    // Configuration with environtment file
    ConfigModule.forRoot(),
    // Database config
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
