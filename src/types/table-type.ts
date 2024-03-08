export interface ITableData {
  ccn3: string;
  cca3: string;
  region: string;
  official_name: string;
  captial: string[];
  population: string;
  area: string;
}

export const TABLENAMEORDER = [
  "ccn3",
  "cca3",
  "region",
  "official_name",
  "captial",
  "population",
  "area",
];

export const TABLENAMEORDERMAP = new Map([
  ["ccn3", "id"],
  ["cca3", "Code"],
  ["region", "Region"],
  ["official_name", "Country Name"],
  ["captial", "Captial"],
  ["population", "Population"],
  ["area", "Area(m²)"],
]);
