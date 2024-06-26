import { LoginAttemptMapper } from '@/auth/domain/mappers/LoginAttempt.mapper';
import { LoginAttemptModel } from '@/auth/domain/models/LoginAttempt.model';
import { LoginAttemptEntity } from '@/database/entities/LoginAttempt.entity';

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ILoginAttemptRepository } from '@/auth/domain/respositories/ILoginAttempt.repository.interface';

@Injectable()
export class LoginAttemptRepository implements ILoginAttemptRepository {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(LoginAttemptEntity)
    private readonly loginAttemptDB: Repository<LoginAttemptEntity>,
  ) {}

  findAll(): Promise<LoginAttemptModel[]> {
    throw new Error('Method not implemented.');
  }

  async create(syncReq: LoginAttemptModel): Promise<LoginAttemptModel> {
    const result = await this.findById(syncReq.id);
    if (!result) {
      const loginAttemptSaved = await this.loginAttemptDB.save(
        syncReq.serialize(),
      );
      if (loginAttemptSaved) {
        return new LoginAttemptMapper(loginAttemptSaved).execute();
      }
    }
    return result;
  }

  async findById(id: number): Promise<LoginAttemptModel> {
    const result = await this.loginAttemptDB.findOneBy({ id });
    if (result) {
      return new LoginAttemptMapper(result).execute();
    }
  }

  async update(syncReq: LoginAttemptModel): Promise<LoginAttemptModel> {
    const result = await this.loginAttemptDB.save(syncReq.serialize());
    return new LoginAttemptMapper(result).execute();
  }
}
