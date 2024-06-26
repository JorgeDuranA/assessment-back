export interface CreateCountryDto {
  name: string;
  currency?: string;
}

export interface UpdateCountryDto {
  name?: string;
  currency?: string;
}
