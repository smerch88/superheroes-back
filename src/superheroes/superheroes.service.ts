import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { GetSuperheroesFilterDto } from './dto/get-superheroes-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Superhero } from './superhero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuperheroesService {
  constructor(
    @InjectRepository(Superhero)
    private readonly superheroRepository: Repository<Superhero>,
  ) {}

  async getSuperheroes(
    filterDto: GetSuperheroesFilterDto,
  ): Promise<Superhero[]> {
    const { search } = filterDto;
    const query = this.superheroRepository.createQueryBuilder('superhero');

    if (search) {
      query.andWhere(
        '(superhero.title LIKE :search OR superhero.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const Superheroes = await query.getMany();
    return Superheroes;
  }

  async getSuperheroById(id: number): Promise<Superhero> {
    const found = await this.superheroRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Superhero with ID "${id}" not found`);
    }

    return found;
  }

  async createSuperhero(
    createSuperheroDto: CreateSuperheroDto,
  ): Promise<Superhero> {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      imageLinks,
    } = createSuperheroDto;

    const superhero = new Superhero();
    superhero.nickname = nickname;
    superhero.real_name = real_name;
    superhero.origin_description = origin_description;
    superhero.superpowers = superpowers;
    superhero.catch_phrase = catch_phrase;
    superhero.imageLinks = imageLinks;

    await superhero.save();

    return superhero;
  }

  async deleteSuperhero(id: number): Promise<void> {
    const result = await this.superheroRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Superhero with ID "${id}" not found`);
    }
  }

  async updateSuperhero(
    id: number,
    createSuperheroDto: CreateSuperheroDto,
  ): Promise<Superhero> {
    const superhero = await this.getSuperheroById(id);
    superhero.nickname = createSuperheroDto.nickname;
    superhero.real_name = createSuperheroDto.real_name;
    superhero.origin_description = createSuperheroDto.origin_description;
    superhero.superpowers = createSuperheroDto.superpowers;
    superhero.catch_phrase = createSuperheroDto.catch_phrase;
    superhero.imageLinks = createSuperheroDto.imageLinks;

    await superhero.save();
    return superhero;
  }
}
