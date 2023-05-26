import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetSuperheroesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  page: number;
}
