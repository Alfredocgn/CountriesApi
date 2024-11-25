export interface PopulationCountry {
  error: boolean;
  msg: string;
  data: {
    country: string;
    population: number;
    iso3: string;
    populationCounts: [
      {
        year: number;
        value: number;
      },
    ];
  };
}
