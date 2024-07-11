import { BrandingModel } from '@/assessments/domain/models/Branding.model';
import { IBrandingRepository } from '@/assessments/domain/repositories/IBranding.repository.interface';
import { IBrandingService } from '@/assessments/domain/services/IBranding.service.interface';
import SymbolsAssessments from '@/assessments/symbols';
import { Inject } from '@nestjs/common';
import { CreateBrandingDto } from '../dtos/createBranding';

export class BrandingService implements IBrandingService {
  constructor(
    @Inject(SymbolsAssessments.IBrandingRepository)
    private brandingRepository: IBrandingRepository,
  ) {}

  async save(branding: CreateBrandingDto): Promise<BrandingModel> {
    return await this.brandingRepository.save(branding);
  }

  async findAll(): Promise<BrandingModel[]> {
    return await this.brandingRepository.findAll();
  }

  async findOneById(id: number): Promise<BrandingModel> {
    return await this.brandingRepository.findOneById(id);
  }
}
