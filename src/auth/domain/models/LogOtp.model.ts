import { BaseModel } from '@/auth/domain/models/BaseModel.model';

export interface LogOtpProps {
  readonly id: number;
  readonly otp: string;
  readonly otpExpiresOn: Date;
  readonly email: string;
  readonly active: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly token: string;
}

export class LogOtpModel extends BaseModel implements LogOtpProps {
  readonly id: number;
  readonly otp: string;
  readonly otpExpiresOn: Date;
  readonly email: string;
  readonly active: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  token: string;

  constructor(props?: LogOtpProps) {
    super();
    if (props) {
      this.setProps(props);
    }
  }
}
