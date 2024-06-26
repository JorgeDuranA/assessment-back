import { LogOtpModel } from '@/auth/domain/models/LogOtp.model';
import { UserModel } from '@/auth/domain/models/User.model';

export interface IUserRepository {
  create(exchangeRate: UserModel): Promise<UserModel>;
  findById(id: number): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel>;
  update(loginAttempt: UserModel): Promise<UserModel>;
  findAll(): Promise<UserModel[]>;
  findByPhone(phone: string, areaCode: string): Promise<UserModel>;
  findByCode(code: string): Promise<LogOtpModel>;
}
