import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getAvailableCountries = async () => {
  try {
    const response = await api.get("/countries");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCountryInfo = async (countryCode: string) => {
  try {
    const response = await api.get(`/countries/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCountryPopulation = async (country: string) => {
  try {
    const response = await api.post("/countries/population", { country });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCountryFlag = async (iso2: string) => {
  try {
    const response = await api.post("/countries/flag/images", { iso2 });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default api;
