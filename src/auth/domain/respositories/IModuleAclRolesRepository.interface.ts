import { ModuleAclRolesResponseProps } from '@/auth/domain/types/ModuleAclRoles';

export interface IModuleAclRepository {
  findByIdRole(idRole: number): Promise<ModuleAclRolesResponseProps>;
}
