import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleMapper } from '@/catalogs/domain/mappers/Role.mapper';
import { RoleModel, RoleProps } from '@/catalogs/domain/models/Role.model';
import { IRoleRepository } from '@/catalogs/domain/repositories/IRole.repository.interface';
import { Role } from '@/database/entities/Role.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class RoleRepository implements IRoleRepository {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Role)
    private readonly RoleDB: Repository<Role>,
  ) {}
  async findOneById(id: number): Promise<RoleModel> {
    const result = await this.RoleDB.findOne({
      where: {
        id,
        active: true,
      },
    });

    if (result) {
      return new RoleMapper(result).execute();
    }
  }
  async create(Role: RoleProps): Promise<RoleModel> {
    const result = this.RoleDB.create({
      role: Role.role,
      description: Role.description,
      level: Role.level,
    });

    const { id } = await result.save();
    return await this.findOneById(id);
  }
  async findAll(): Promise<RoleModel[]> {
    const result = await this.RoleDB.find({ where: { active: true } });
    return result.map((Role) => new RoleMapper(Role).execute());
  }
  async updateById(id: number, update: RoleModel): Promise<RoleModel> {
    const result = await this.findOneById(id);
    if (result) {
      await this.RoleDB.update(
        {
          id,
          active: true,
        },
        {
          ...(update as QueryDeepPartialEntity<Role>),
        },
      );

      const updated = this.findOneById(id);
      return updated;
    }
  }
}
