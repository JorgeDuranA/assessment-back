import { AuthDto } from '@/auth/application/dtos/Auth.dto';
import { AuthMeModel } from '@/auth/domain/models/AuthMe.model';
import { HeaderModel } from '@/auth/domain/models/Headers.model';
import { LoginResult } from '@/auth/domain/models/LoginResult.model';
import { LogOtpModel } from '@/auth/domain/models/LogOtp.model';
import { RefreshJWTResult } from '@/auth/domain/models/RefreshJWTResult.model';
import { UserModel } from '@/auth/domain/models/User.model';
import { IModuleAclRepository } from '@/auth/domain/respositories/IModuleAclRolesRepository.interface';
import { IUserRepository } from '@/auth/domain/respositories/IUser.repository.interface';
import { IAuthService } from '@/auth/domain/services/IAuth.service.interface';
import { JwtPayload, JwtPayloadPhone, otpCode } from '@/auth/domain/types';
import SymbolsAuth from '@/auth/symbols';
import config from '@/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(SymbolsAuth.IUserRepository)
    private userRepository: IUserRepository,
    @Inject(SymbolsAuth.IModuleAclRepository)
    private moduleAclRepository: IModuleAclRepository,
    private readonly configService: ConfigService,
  ) {}

  async loginJWT(auth: AuthDto): Promise<LoginResult> {
    const response: LoginResult = {
      success: false,
      message: '',
      token: '',
    };

    const user = await this.validateUser({
      email: auth.email,
      username: auth.email,
    });

    if (!user) {
      response.message = 'Usuario o correo incorrecto.';
      return response;
    }

    const valid = await bcrypt.compare(auth.password, user.password);
    if (!valid) {
      response.message = 'Contraseña incorrecta.';
      return response;
    }
    const aclResult = await this.moduleAclRepository.findByIdRole(
      user.roles[0].id,
    );
    const arrayAcl = [];
    aclResult.result.forEach((item) => {
      const find = arrayAcl.find((element) => {
        if (element.module == item.idModuleAcl.idCModule.nameModule) {
          element.action.push(item.idModuleAcl.idCAcl.nameAction);
          return element;
        }
      }, []);
      if (find == undefined) {
        arrayAcl.push({
          module: item.idModuleAcl.idCModule.nameModule,
          action: [item.idModuleAcl.idCAcl.nameAction],
        });
      }
    });
    user.setProps({ acl: arrayAcl });

    const options = {
      secret: config().app.jwt.secret,
      expiresIn: config().app.jwt.expiresIn,
    };
    const payload = user;

    response.success = true;
    response.message = 'success';
    response.token = this.jwtService.sign(payload.serialize(), options);

    return response;
  }

  validateApiKey(apiKey: string, done: (error: Error, data) => any): any {
    if (this.configService.get<string>('APP_API_KEY') === apiKey) {
      done(null, true);
    }
    done(new UnauthorizedException(), null);
  }

  async validateUser(payload: JwtPayload): Promise<UserModel> {
    const user = await this.userRepository.findByEmail(payload.email);
    if (user) {
      return user;
    }
    return null;
  }

  async authMe(headers: HeaderModel): Promise<AuthMeModel> {
    const response: AuthMeModel = {
      userData: {},
    };

    const token = this.extractTokenFromHeader(headers);
    const payload = this.jwtService.decode(token) as UserModel;

    response.userData = payload;

    return response;
  }

  async refreshJWT(headers: HeaderModel): Promise<RefreshJWTResult> {
    const response: RefreshJWTResult = {
      success: false,
      message: '',
      token: '',
      userData: {},
    };

    const oldtoken = this.extractTokenFromHeader(headers);
    const oldPayload = this.jwtService.decode(oldtoken) as UserModel;

    const user = await this.validateUser({
      email: oldPayload.email,
      username: oldPayload.username,
    });

    if (!user) {
      response.message = "User doesn't exist";
      return response;
    }

    const options = {
      secret: config().app.jwt.secret,
      expiresIn: config().app.jwt.expiresIn,
    };
    const payload = user;

    response.success = true;
    response.message = 'Refresh token success';
    response.userData = user;
    response.token = this.jwtService.sign(payload.serialize(), options);

    return response;
  }

  private extractTokenFromHeader(headers: HeaderModel): string {
    const token = headers.authorization;

    if (token) {
      return token.split(' ')[1];
    } else {
      return '';
    }
  }

  async validateUserPhone(payload: JwtPayloadPhone): Promise<UserModel> {
    const userPhone = await this.userRepository.findByPhone(
      payload.phone,
      payload.areaCode,
    );
    if (userPhone) {
      return userPhone;
    }
    return null;
  }

  async validateCodeOtp(code: otpCode): Promise<LogOtpModel> {
    const userCode = await this.userRepository.findByCode(code.otp);
    if (userCode) {
      return userCode;
    }
    return null;
  }
}
