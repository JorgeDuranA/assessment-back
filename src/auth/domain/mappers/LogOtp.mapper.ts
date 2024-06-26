import { LogOtpModel } from '@/auth/domain/models/LogOtp.model';
import { LogOtpEntity } from '@/database/entities/LogOtp.entity';

export class LoginOtpMapper {
  logOtp: LogOtpModel;

  constructor(entity: LogOtpEntity) {
    const logOtp = new LogOtpModel();
    logOtp.setProps({
      ...entity,
    });

    this.logOtp = logOtp;
  }

  public execute(): LogOtpModel {
    return this.logOtp;
  }
}
