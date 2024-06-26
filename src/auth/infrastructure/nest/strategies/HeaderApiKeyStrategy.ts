import { IAuthService } from '@/auth/domain/services/IAuth.service.interface';
import Symbols from '@/auth/symbols';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key',
) {
  constructor(
    @Inject(Symbols.IAuthService)
    private readonly authService: IAuthService,
  ) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      return this.authService.validateApiKey(apiKey, done);
    });
  }
}
