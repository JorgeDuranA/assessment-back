import { BrandingModel, BrandingProps } from '../models/Branding.model';

export interface IBrandingRepository {
  findOneById(id: number): Promise<BrandingModel>;
  save(branding: BrandingProps): Promise<BrandingModel>;
  findAll(): Promise<BrandingModel[]>;
}
