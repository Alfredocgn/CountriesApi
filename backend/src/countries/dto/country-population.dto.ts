import { IsNotEmpty, IsString } from 'class-validator';

export class CountryPopulationDto {
  @IsString()
  @IsNotEmpty()
  country: string;
}
