import { IsNotEmpty, IsString } from 'class-validator';

export class CountryFlagDto {
  @IsString()
  @IsNotEmpty()
  iso2: string;
}
