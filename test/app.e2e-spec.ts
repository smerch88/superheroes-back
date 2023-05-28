import { Test, TestingModule } from '@nestjs/testing';
import { CreateSuperheroDto } from 'src/superheroes/dto/create-superhero.dto';
import { Superhero } from 'src/superheroes/superhero.entity';
import { SuperheroesController } from 'src/superheroes/superheroes.controller';
import { SuperheroesService } from 'src/superheroes/superheroes.service';

describe('SuperheroesController', () => {
  let superheroesController: SuperheroesController;
  let superheroesService: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [SuperheroesService],
    }).compile();

    superheroesController = module.get<SuperheroesController>(
      SuperheroesController,
    );
    superheroesService = module.get<SuperheroesService>(SuperheroesService);
  });

  describe('getSuperheroById', () => {
    it('should return a superhero with the given ID', async () => {
      const mockId = 1;
      const mockSuperhero = new Superhero();
      jest
        .spyOn(superheroesService, 'getSuperheroById')
        .mockResolvedValue(mockSuperhero);

      const result = await superheroesController.getSuperheroById(mockId);

      expect(result).toEqual(mockSuperhero);
      expect(superheroesService.getSuperheroById).toHaveBeenCalledWith(mockId);
    });
  });

  describe('createSuperhero', () => {
    it('should create and return a new superhero', async () => {
      const mockCreateDto: CreateSuperheroDto = {
        nickname: 'Superman',
        real_name: 'Clark Kent',
        origin_description: 'The Last Son of Krypton',
        superpowers: 'Flight, Super Strength, Heat Vision',
        catch_phrase: 'Up, up, and away!',
        imageLinks: [],
      };
      const mockSuperhero = new Superhero();
      jest
        .spyOn(superheroesService, 'createSuperhero')
        .mockResolvedValue(mockSuperhero);

      const result = await superheroesController.createSuperhero(mockCreateDto);

      expect(result).toEqual(mockSuperhero);
      expect(superheroesService.createSuperhero).toHaveBeenCalledWith(
        mockCreateDto,
      );
    });
  });
});
