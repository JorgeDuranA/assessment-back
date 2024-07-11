import { BaseModel } from '@/common/models/BaseModel.model';

export interface BrandingProps {
  logo: string;

  primaryColorBtn: string;

  primaryColorText: string;
}

export class BrandingModel extends BaseModel implements BrandingProps {
  id: number;

  logo: string;

  primaryColorBtn: string;

  primaryColorText: string;

  constructor(props?: BrandingProps) {
    super();
    if (props) {
      this.setProps({
        ...props,
      });
    }
  }
}
