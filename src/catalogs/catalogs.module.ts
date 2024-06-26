import { AuthModule } from '@/auth/auth.module';
import SymbolsCatalogs from '@/catalogs/symbols';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//Role
import { RoleService } from '@/catalogs/application/services/role.service';
import { RoleController } from '@/catalogs/infrastructure/nest/controllers/role.controller';
import { RoleRepository } from '@/catalogs/infrastructure/typeorm/repositories/Role.repository';
import { Role } from '@/database/entities/Role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  providers: [
    {
      provide: SymbolsCatalogs.IRoleRepository,
      useClass: RoleRepository,
    },
    {
      provide: SymbolsCatalogs.IRoleService,
      useClass: RoleService,
    },
  ],
  controllers: [RoleController],
  exports: [CatalogsModule, SymbolsCatalogs.IRoleService],
})
export class CatalogsModule {}
