import { LoginAttemptModel } from '@/auth/domain/models/LoginAttempt.model';
import { LoginAttemptEntity } from '@/database/entities/LoginAttempt.entity';

export class LoginAttemptMapper {
  loginAttempt: LoginAttemptModel;

  constructor(entity: LoginAttemptEntity) {
    const loginAttempt = new LoginAttemptModel();
    loginAttempt.setProps({
      ...entity,
    });

    this.loginAttempt = loginAttempt;
  }

  public execute(): LoginAttemptModel {
    return this.loginAttempt;
  }
}
