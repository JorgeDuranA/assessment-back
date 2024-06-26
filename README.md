![Alt text](http://dev.alpex.dynamicreinsurance.com.s3-website.us-east-2.amazonaws.com/images/logos/logo-alpex.svg)

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Arquitectura hexagonal + Vertical Slicing + Screaming

## Requirements

- Node v18.15.0
- Nest CLI
- BD POSTGRES SQL
- npm

## Installation

```bash
$ npm run install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

```bash
# create migrations
$ npm typeorm:migrate <path migrations>
```

## Create route api

The creation of the controllers will be in the infrastructure layer inside the nest/controller folder
via nestjs annotations

- @Post
- @put
- @Delete

[read more..](https://docs.nestjs.com/controllers)

How to name an api route:

```text
  URL-BASE = http://api.alpex.com/api/v1/

    PATH-PARAM = Optional parameter to obtain some specific information

    example:

    [URL-BASE]/[MODULO]/[ACCION]/?[PATH-PARAM]

    account
    [POST]	/api/v1/account/add
    [PUT - PATCH] /api/v1/account/update/:idAccount
    [GET] /api/v1/account/:id
    [GET] /api/v1/account/all
    [DELETE] /api/v1/account/:id
    [GET] /api/v1/account/last-step
```

And when the module or the action is more than two words, separate them with "-"
example: last-step

## Creation documentation Swagger

To create the api documentation we will use the swagger library, making use of the annotations to document the input and output DTOs

[read more here](https://docs.nestjs.com/openapi/introduction)

example Dto

```typescript
//src/auth/infrastructure/nest/dtos

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty() //swagger documentation
  @IsString() //class validator
  @IsNotEmpty() //class validator
  readonly email: string;
  @ApiProperty() //swagger documentation
  @IsString() //class validator
  @IsNotEmpty() //class validator
  readonly password: string;
}
```

example controller

```typescript
//src/auth/infrastructure/nest/controllers

import { ApiBody, ApiHeader, ApiUnauthorizedResponse } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SymbolsAuth.IAuthService)
    private readonly authService: IAuthService,
  ) {}

  @Post()
  @ApiHeader({
    name: 'x-api-key',
    description: 'Api key authorization',
  }) //swagger documentation
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    status: 401,
    type: unauthorizedResponse,
  }) //swagger documentation
  @ApiBody({ type: AuthDto }) //swagger documentation
  async auth(@Body() auth: AuthDto): Promise<LoginResult> {
    return this.authService.loginJWT(auth);
  }
}
```

Validation of api-key, authentication and roles

```typescript
import { LoginResult } from '@/auth/domain/models/LoginResult.model';
import { IAuthService } from '@/auth/domain/services/IAuth.service.interface';
import { Roles } from '@/auth/infrastructure/nest/decorators/Role.decorator';
import { AuthDto } from '@/auth/infrastructure/nest/dtos/Auth.dto';

import { RoleGuard } from '@/auth/infrastructure/nest/guards/RoleGuard';
import SymbolsAuth from '@/auth/symbols';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UseGuards(AuthGuard('api-key')) //
export class AuthController {
  constructor(
    @Inject(SymbolsAuth.IAuthService)
    private readonly authService: IAuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard) //jwt validation and roles
  @Roles('admin', 'user') //allowed roles
  async findUser(): Promise<any> {
    return 'omar';
  }
}
```

## Stay in touch

- TL - [@OALR](https://www.linkedin.com/in/omar-arturo-lopez-rodriguez-016a6253/)
