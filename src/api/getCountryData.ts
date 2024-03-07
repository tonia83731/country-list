import axios from "axios";
import { CountryItem } from "../types/response-type";

const BASE_URL = "https://restcountries.com/v3.1";

export const getRegion = async () => {
  const response = await axios.get(`${BASE_URL}/all?fields=region`);
  const { data } = response;
  const regionSet = new Set<string>();
  for (const i in data) {
    const { region } = data[i];
    regionSet.add(region);
  }
  const regionArr: string[] = [...regionSet];
  return regionArr;
};

export const getAllCountries = async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  const { data } = response;
  return data;
};

export const getCountriesBySlice = async (
  firstIndex: number,
  lastIndex: number
) => {
  const data = await getAllCountries();
  return data.slice(firstIndex, lastIndex);
};

export const getCountriesByRegion = async (
  region: string
): Promise<CountryItem[]> => {
  const response = await axios.get(`${BASE_URL}/region/${region}`);
  const { data } = response;
  return data;
};

export const getCountriesByName = async (
  name: string
): Promise<CountryItem[]> => {
  const response = await axios.get(`${BASE_URL}/name/${name}`);
  const { data } = response;
  return data;
};

export const getCountriesByCode = async (
  code: string
): Promise<CountryItem[]> => {
  const response = await axios.get(`${BASE_URL}/alpha/${code}`);
  const { data } = response;
  return data;
};
