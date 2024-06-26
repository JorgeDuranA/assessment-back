import { UserModel } from '@/auth/domain/models/User.model';
import { IAuthService } from '@/auth/domain/services/IAuth.service.interface';
import { JwtPayload } from '@/auth/domain/types';
import Symbols from '@/auth/symbols';
import config from '@/config';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Symbols.IAuthService)
    private readonly authService: IAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config().app.jwt.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserModel> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
