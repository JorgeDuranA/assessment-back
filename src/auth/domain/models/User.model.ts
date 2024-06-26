import { LoginAttemptModel } from '@/auth/domain/models/LoginAttempt.model';
import { RoleModel } from '@/auth/domain/models/Role.model';
import { AclResponseProps } from '@/auth/domain/types/Acl';
import { BaseModel } from '@/common/models/BaseModel.model';

export interface UserProps {
  readonly id: number;
  readonly roles?: RoleModel[];
  readonly name: string;
  readonly phone: string;
  readonly surname: string;
  readonly username?: string;
  readonly secondSurname: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly status: boolean;
  readonly isDeleted: boolean;
  readonly loginAttempts: LoginAttemptModel[];
  readonly acl?: AclResponseProps[];
}

export class UserModel extends BaseModel implements UserProps {
  readonly id: number;
  readonly roles?: RoleModel[];
  readonly name: string;
  readonly phone: string;
  readonly surname: string;
  readonly username?: string;
  readonly secondSurname: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly status: boolean;
  readonly isDeleted: boolean;
  readonly loginAttempts: LoginAttemptModel[];
  readonly acl?: AclResponseProps[];

  constructor(props?: UserProps) {
    super();
    if (props) {
      this.setProps(props);
    }
  }
}
