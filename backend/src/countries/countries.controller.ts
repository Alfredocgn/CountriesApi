import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { AvailableCountry } from './interfaces/available-countries';
import { CountryInfo } from './interfaces/country-info';
import { CountryPopulationDto } from './dto/country-population.dto';
import { PopulationCountry } from './interfaces/population-country';
import { CountryFlagDto } from './dto/country-flag.dto copy';
import { FlagCountry } from './interfaces/flag-country';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  getAvailableCountries(): Promise<AvailableCountry[]> {
    return this.countriesService.getAvailableCountries();
  }

  @Get(':countryCode')
  getCountryInfo(
    @Param('countryCode') countryCode: string,
  ): Promise<CountryInfo> {
    return this.countriesService.getCountryInfo(countryCode);
  }

  @Post('population')
  getCountryPopulation(
    @Body() countryPopulationDto: CountryPopulationDto,
  ): Promise<PopulationCountry> {
    return this.countriesService.getCountryPopulation(countryPopulationDto);
  }

  @Post('flag/images')
  getCountryFlag(@Body() countryFlagDto: CountryFlagDto): Promise<FlagCountry> {
    return this.countriesService.getCountryFlag(countryFlagDto);
  }
}
