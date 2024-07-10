import {
  BrandingModel,
  BrandingProps,
} from '@/assessments/domain/models/Branding.model';
import { IBrandingRepository } from '@/assessments/domain/repositories/IBranding.repository.interface';
import { Branding } from '@/database/entities/Branding.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class BrandingRepository implements IBrandingRepository {
  constructor(
    @InjectRepository(Branding)
    private readonly brandingDB: Repository<Branding>,
  ) {}

  async findOneById(id: number): Promise<BrandingModel> {
    const brand = await this.brandingDB.findOne({
      where: {
        id,
      },
    });
    return new BrandingModel({
      logo: brand.logo,
      primaryColorBtn: brand.primaryColorBtn,
      primaryColorText: brand.primaryColorText,
    });
  }

  async save(branding: BrandingProps): Promise<BrandingModel> {
    const brand = new Branding();
    brand.logo = branding.logo;
    brand.primaryColorBtn = branding.primaryColorBtn;
    brand.primaryColorText = branding.primaryColorText;
    const result = await this.brandingDB.save(brand);
    return this.findOneById(result.id);
  }

  async findAll(): Promise<BrandingModel[]> {
    const result = await this.brandingDB.find();
    return result.map(
      (brand) =>
        new BrandingModel({
          logo: brand.logo,
          primaryColorBtn: brand.primaryColorBtn,
          primaryColorText: brand.primaryColorText,
        }),
    );
  }
}
