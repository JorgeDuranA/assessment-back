import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IAuthService } from '@/auth/domain/services/IAuth.service.interface';
import { ROLES_KEY } from '@/auth/infrastructure/nest/decorators/Role.decorator';
import Symbols from '@/auth/symbols';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(Symbols.IAuthService)
    private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log({ requiredRoles });
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user || !user.roles) {
      return false;
    }

    let userRoles = '';
    user.roles.forEach((role) => {
      userRoles += ' ' + role.role;
    });
    console.log({ userRoles });
    return requiredRoles.some((role) => userRoles?.includes(role));
  }
}
