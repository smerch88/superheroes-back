import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { GetSuperheroesFilterDto } from './dto/get-superheroes-filter.dto';
import { Superhero } from './superhero.entity';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private superheroesService: SuperheroesService) {}

  @Get()
  getSuperheroes(
    @Query(ValidationPipe) filterDto: GetSuperheroesFilterDto,
  ): Promise<{ superheroes: Superhero[]; total: number }> {
    return this.superheroesService.getSuperheroes(filterDto);
  }

  @Get('/:id')
  getSuperheroById(@Param('id', ParseIntPipe) id: number): Promise<Superhero> {
    return this.superheroesService.getSuperheroById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createSuperhero(
    @Body() createSuperheroDto: CreateSuperheroDto,
  ): Promise<Superhero> {
    return this.superheroesService.createSuperhero(createSuperheroDto);
  }

  @Delete('/:id')
  deleteSuperhero(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.superheroesService.deleteSuperhero(id);
  }

  @Patch('/:id')
  updateSuperhero(
    @Param('id', ParseIntPipe) id: number,
    @Body() createSuperheroDto: CreateSuperheroDto,
  ): Promise<Superhero> {
    return this.superheroesService.updateSuperhero(id, createSuperheroDto);
  }
}
