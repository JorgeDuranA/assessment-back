import { BaseModel } from '@/auth/domain/models/BaseModel.model';
import { UserModel } from '@/auth/domain/models/User.model';

export interface LoginAttemptProps {
  readonly id?: number;
  readonly time_login: Date;
  readonly ip: string;
  readonly timeLogout?: Date;
  readonly login_attempt: string;
  readonly user_Id?: UserModel;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}
export class LoginAttemptModel extends BaseModel implements LoginAttemptProps {
  readonly id: number;
  readonly time_login: Date;
  readonly ip: string;
  readonly timeLogout: Date;
  readonly login_attempt: string;
  readonly userId: UserModel;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(props?: LoginAttemptProps) {
    super();
    if (props) {
      this.setProps(props);
    }
  }
}
