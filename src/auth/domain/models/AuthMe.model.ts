import { UserModel } from './User.model';

export interface AuthMeModel {
  userData: Partial<UserModel>;
}
