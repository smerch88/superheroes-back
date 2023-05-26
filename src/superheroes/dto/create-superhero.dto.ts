import { ArrayMaxSize, IsNotEmpty } from 'class-validator';

export class CreateSuperheroDto {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  real_name: string;

  @IsNotEmpty()
  origin_description: string;

  @IsNotEmpty()
  superpowers: string;

  @IsNotEmpty()
  catch_phrase: string;

  @ArrayMaxSize(10)
  imageLinks: string[];
}
