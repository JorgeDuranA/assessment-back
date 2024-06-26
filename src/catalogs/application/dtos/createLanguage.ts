export interface CreateLanguageDto {
  isoCode: string;
  language: string;
  fileName?: string;
}

export interface UpdateLanguageDto {
  isoCode: string;
  language: string;
  fileName?: string;
}
