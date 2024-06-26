import { LoginAttemptModel } from '@/auth/domain/models/LoginAttempt.model';

export interface ILoginAttemptRepository {
  create(exchangeRate: LoginAttemptModel): Promise<LoginAttemptModel>;
  findById(id: number): Promise<LoginAttemptModel>;
  update(loginAttempt: LoginAttemptModel): Promise<LoginAttemptModel>;
  findAll(): Promise<LoginAttemptModel[]>;
}
