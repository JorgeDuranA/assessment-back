import { CreateBrandingDto } from '@/assessments/application/dtos/createBranding';
import { BrandingModel } from '../models/Branding.model';

export interface IBrandingService {
  findOneById(id: number): Promise<BrandingModel>;
  save(branding: CreateBrandingDto): Promise<BrandingModel>;
  findAll(): Promise<BrandingModel[]>;
}
