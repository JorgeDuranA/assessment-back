export interface CreateRiskActivityDto {
  industryCode: number;
  riskActivity: string;
  occupancy: string;
  class: number;
}

export interface UpdateCountryDto {
  industryCode?: number;
  riskActivity?: string;
  occupancy?: string;
  class?: number;
}
