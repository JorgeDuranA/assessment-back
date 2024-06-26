import { LoginOtpMapper } from '@/auth/domain/mappers/LogOtp.mapper';
import { UserMapper } from '@/auth/domain/mappers/User.mapper';
import { LogOtpModel } from '@/auth/domain/models/LogOtp.model';
import { UserModel } from '@/auth/domain/models/User.model';
import { IUserRepository } from '@/auth/domain/respositories/IUser.repository.interface';
import { LogOtpEntity } from '@/database/entities/LogOtp.entity';
import { UserEntity } from '@/database/entities/User.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(UserEntity)
    public userRepository: Repository<UserEntity>,
    @InjectRepository(LogOtpEntity)
    public LogOtpRepository: Repository<LogOtpEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserModel> {
    const result = await this.userRepository.findOne({
      where: {
        email: email,
        isDeleted: false,
      },
      relations: ['roles'],
    });
    if (result) {
      return new UserMapper(result).execute();
    }
  }

  findAll(): Promise<UserModel[]> {
    throw new Error('Method not implemented.');
  }

  async create(syncReq: UserModel): Promise<UserModel> {
    const result = await this.findById(syncReq.id);
    if (!result) {
      const userSaved = await this.userRepository.save(syncReq.serialize());
      if (userSaved) {
        return new UserMapper(userSaved).execute();
      }
    }
    return result;
  }

  async findById(id: number): Promise<UserModel> {
    const result = await this.userRepository.findOneBy({ id });
    if (result) {
      return new UserMapper(result).execute();
    }
  }

  async update(syncReq: UserModel): Promise<UserModel> {
    const result = await this.userRepository.save(syncReq.serialize());
    return new UserMapper(result).execute();
  }

  async findByPhone(phone: string, areaCode: string): Promise<UserModel> {
    const result = await this.userRepository.findOne({
      where: {
        phone: phone,
        areaCode: areaCode,
      },
    });
    if (result) {
      return new UserMapper(result).execute();
    }
  }

  async findByCode(code: string): Promise<LogOtpModel> {
    const result = await this.LogOtpRepository.findOne({
      where: {
        otp: code,
      },
    });
    if (result) {
      return new LoginOtpMapper(result).execute();
    }
  }
}
