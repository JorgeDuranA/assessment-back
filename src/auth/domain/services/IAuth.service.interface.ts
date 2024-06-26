import { AuthDto } from '@/auth/application/dtos/Auth.dto';
import { AuthMeModel } from '@/auth/domain/models/AuthMe.model';
import { LoginResult } from '@/auth/domain/models/LoginResult.model';
import { UserModel } from '@/auth/domain/models/User.model';
import { JwtPayload, JwtPayloadPhone, otpCode } from '@/auth/domain/types';
import { HeaderModel } from '../models/Headers.model';
import { LogOtpModel } from '../models/LogOtp.model';
import { RefreshJWTResult } from '../models/RefreshJWTResult.model';

export interface IAuthService {
  loginJWT(auth: AuthDto): Promise<LoginResult>;
  authMe(headers: HeaderModel): Promise<AuthMeModel>;
  refreshJWT(headers: HeaderModel): Promise<RefreshJWTResult>;
  validateApiKey(apiKey: string, done: (error: Error, data) => any);
  validateUser(payload: JwtPayload): Promise<UserModel>;
  validateUserPhone(payload: JwtPayloadPhone): Promise<UserModel>;
  validateCodeOtp(code: otpCode): Promise<LogOtpModel>;
}
