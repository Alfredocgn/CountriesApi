import { Injectable, Logger } from '@nestjs/common';
import { AvailableCountry } from './interfaces/available-countries';
import axios, { AxiosInstance } from 'axios';
import { CountryInfo } from './interfaces/country-info';
import { PopulationCountry } from './interfaces/population-country';
import { CountryPopulationDto } from './dto/country-population.dto';
import { CountryFlagDto } from './dto/country-flag.dto copy';
import { FlagCountry } from './interfaces/flag-country';

@Injectable()
export class CountriesService {
  private readonly nagerDateApi: AxiosInstance;
  private readonly postmanApi: AxiosInstance;
  private readonly logger = new Logger('Countries');

  constructor() {
    this.nagerDateApi = axios.create({
      baseURL: process.env.NAGER_DATE_API_URL,
    });
    this.postmanApi = axios.create({
      baseURL: process.env.POSTMAN_API_URL,
    });
  }

  async getAvailableCountries(): Promise<AvailableCountry[]> {
    try {
      const response = await this.nagerDateApi.get('/AvailableCountries');
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfo> {
    console.log(countryCode);
    try {
      const response = await this.nagerDateApi.get(
        `/CountryInfo/${countryCode}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getCountryPopulation(
    countryPopulationDto: CountryPopulationDto,
  ): Promise<PopulationCountry> {
    try {
      const response = await this.postmanApi.post('/countries/population', {
        country: countryPopulationDto.country,
      });
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getCountryFlag(countryFlagDto: CountryFlagDto): Promise<FlagCountry> {
    try {
      const response = await this.postmanApi.post('/countries/flag/images', {
        iso2: countryFlagDto.iso2,
      });
      return response.data;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
