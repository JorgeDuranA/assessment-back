import { UserModel } from '@/auth/domain/models/User.model';
import { UserEntity } from '@/database/entities/User.entity';

export class UserMapper {
  user: UserModel;

  constructor(entity: UserEntity) {
    const user = new UserModel();
    user.setProps({
      ...entity,
    });

    this.user = user;
  }

  public execute(): UserModel {
    return this.user;
  }
}
