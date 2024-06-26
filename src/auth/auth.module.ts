import { AuthService } from '@/auth/application/services/Auth.service';
import { AuthController } from '@/auth/infrastructure/nest/controllers/Auth.controller';
import { HeaderApiKeyStrategy } from '@/auth/infrastructure/nest/strategies/HeaderApiKeyStrategy';
import { LoginStrategy } from '@/auth/infrastructure/nest/strategies/LoginStrategy';
import { ModuleAclRolesRepository } from '@/auth/infrastructure/typeorm/repositories/ModuleAclRoles.repository';
import { UserRepository } from '@/auth/infrastructure/typeorm/repositories/User.repository.adapter';
import { default as SymbolsAuth } from '@/auth/symbols';
import { LogOtpEntity } from '@/database/entities/LogOtp.entity';
import { LoginAttemptEntity } from '@/database/entities/LoginAttempt.entity';
import { ModuleAclRoles as ModuleAclRolesEntity } from '@/database/entities/ModuleAclRoles.entity';
import { UserEntity } from '@/database/entities/User.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      LoginAttemptEntity,
      LogOtpEntity,
      ModuleAclRolesEntity,
    ]),
    ConfigModule,
    PassportModule,
  ],

  providers: [
    {
      provide: SymbolsAuth.IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: SymbolsAuth.IAuthService,
      useClass: AuthService,
    },
    {
      provide: SymbolsAuth.IModuleAclRepository,
      useClass: ModuleAclRolesRepository,
    },

    JwtService,
    HeaderApiKeyStrategy,
    LoginStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthModule, SymbolsAuth.IAuthService],
})
export class AuthModule {}
