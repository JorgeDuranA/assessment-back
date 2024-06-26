import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleAclRolesMapper } from '@/auth/domain/mappers/Module.mapper';
import { ModuleAclRoles as ModuleAclRolesEntity } from '@/database/entities/ModuleAclRoles.entity';
import { IModuleAclRepository } from '@/auth/domain/respositories/IModuleAclRolesRepository.interface';
import { ModuleAclRolesResponseProps } from '@/auth/domain/types/ModuleAclRoles';

@Injectable()
export class ModuleAclRolesRepository implements IModuleAclRepository {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(ModuleAclRolesEntity)
    private readonly moduleAclRoles: Repository<ModuleAclRolesEntity>,
  ) {}

  async findByIdRole(idRole: number): Promise<ModuleAclRolesResponseProps> {
    const result = await this.moduleAclRoles.find({
      where: {
        idRole: {
          id: idRole,
        },
      },
      relations: {
        idModuleAcl: {
          idCAcl: true,
          idCModule: true,
        },
      },
    });
    if (result) {
      const userPage: ModuleAclRolesResponseProps = {
        result: result.map((moduleAclRoles) => {
          return new ModuleAclRolesMapper(moduleAclRoles).execute();
        }),
      };
      return userPage;
    }
    return null;
  }
}
