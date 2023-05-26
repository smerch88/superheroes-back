import { Module } from '@nestjs/common';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), SuperheroesModule],
})
export class AppModule {}
