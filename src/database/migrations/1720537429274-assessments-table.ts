import { MigrationInterface, QueryRunner } from 'typeorm';

export class AssessmentsTable1720537429274 implements MigrationInterface {
  name = 'AssessmentsTable1720537429274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS catalogs`);
    await queryRunner.query(
      `CREATE TABLE "assessment" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c511a7dc128256876b6b1719401" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "questionText" character varying NOT NULL, "questionType" character varying NOT NULL, "step" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "assessmentId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "catalogs"."c_acl" ("id" SERIAL NOT NULL, "action_name" character varying(100) NOT NULL, "description" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ed711d97fd4c8d445e3945f4598" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "c_acl_index_key" ON "catalogs"."c_acl" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "catalogs"."c_modules" ("id" SERIAL NOT NULL, "name_module" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_921342684155c962210d117e938" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "c_modules_index_key" ON "catalogs"."c_modules" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "module_acl" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id_c_acl" integer, "id_c_module" integer, CONSTRAINT "PK_be2a705a4138285365c22bb14c3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "module_acl_index_key" ON "module_acl" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "module_acl_roles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id_module_acl" integer, "id_role" integer, CONSTRAINT "PK_fb6189dfdc4fb1217c096d40ec0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "module_acl_roles_index_key" ON "module_acl_roles" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "login_attempts" ("id" SERIAL NOT NULL, "time_login" TIMESTAMP NOT NULL, "ip" character varying NOT NULL, "time_logout" TIMESTAMP, "login_attempt" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_070e613c8f768b1a70742705c5b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "login_attempts_index_key" ON "login_attempts" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying, "area_code" character varying, "phone" character varying, "surname" character varying, "username" character varying, "second_surname" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT true, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "user_index_key" ON "users" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "catalogs"."c_role" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "level" character varying NOT NULL, "description" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1874eaee054ae44ed2b8e0af9c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "role_index_key" ON "catalogs"."c_role" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "option" ("id" SERIAL NOT NULL, "optionText" character varying NOT NULL, "optionValue" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "questionId" integer, CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "log_otp" ("id" SERIAL NOT NULL, "otp" character varying NOT NULL, "otp_expires_on" TIMESTAMP WITH TIME ZONE NOT NULL, "email" character varying, "token" character varying, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a4dc3665534d7da2386e7b79998" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "log_otp_index_key" ON "log_otp" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "answer" ("id" SERIAL NOT NULL, "answerText" character varying NOT NULL, "answerValue" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "questionId" integer, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles" ("id_role" integer NOT NULL, "id_user" integer NOT NULL, CONSTRAINT "PK_e71aa325423f22d074cefe929c4" PRIMARY KEY ("id_role", "id_user"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_815859bd8638fbdb84e543bf1b" ON "users_roles" ("id_role") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_44ac90a39fbb385131c2688254" ON "users_roles" ("id_user") `,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_cc93e703bbc40e60a53db016b39" FOREIGN KEY ("assessmentId") REFERENCES "assessment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "module_acl" ADD CONSTRAINT "FK_e0cf68130c81b022a303aa30416" FOREIGN KEY ("id_c_acl") REFERENCES "catalogs"."c_acl"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "module_acl" ADD CONSTRAINT "FK_0833438c189c4fc07f4b271a98e" FOREIGN KEY ("id_c_module") REFERENCES "catalogs"."c_modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "module_acl_roles" ADD CONSTRAINT "FK_c18fa1123ff43922d2576953452" FOREIGN KEY ("id_module_acl") REFERENCES "module_acl"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "module_acl_roles" ADD CONSTRAINT "FK_17346d9c8eb37d59f0a05ca0473" FOREIGN KEY ("id_role") REFERENCES "catalogs"."c_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_attempts" ADD CONSTRAINT "FK_5f88175f39e2b2ebf9e2295a9fd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "option" ADD CONSTRAINT "FK_b94517ccffa9c97ebb8eddfcae3" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" ADD CONSTRAINT "FK_815859bd8638fbdb84e543bf1b4" FOREIGN KEY ("id_role") REFERENCES "catalogs"."c_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" ADD CONSTRAINT "FK_44ac90a39fbb385131c26882544" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_roles" DROP CONSTRAINT "FK_44ac90a39fbb385131c26882544"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" DROP CONSTRAINT "FK_815859bd8638fbdb84e543bf1b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "option" DROP CONSTRAINT "FK_b94517ccffa9c97ebb8eddfcae3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_attempts" DROP CONSTRAINT "FK_5f88175f39e2b2ebf9e2295a9fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "module_acl_roles" DROP CONSTRAINT "FK_17346d9c8eb37d59f0a05ca0473"`,
    );
    await queryRunner.query(
      `ALTER TABLE "module_acl_roles" DROP CONSTRAINT "FK_c18fa1123ff43922d2576953452"`,
    );
    await queryRunner.query(
      `ALTER TABLE "module_acl" DROP CONSTRAINT "FK_0833438c189c4fc07f4b271a98e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "module_acl" DROP CONSTRAINT "FK_e0cf68130c81b022a303aa30416"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_cc93e703bbc40e60a53db016b39"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_44ac90a39fbb385131c2688254"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_815859bd8638fbdb84e543bf1b"`,
    );
    await queryRunner.query(`DROP TABLE "users_roles"`);
    await queryRunner.query(`DROP TABLE "answer"`);
    await queryRunner.query(`DROP INDEX "public"."log_otp_index_key"`);
    await queryRunner.query(`DROP TABLE "log_otp"`);
    await queryRunner.query(`DROP TABLE "option"`);
    await queryRunner.query(`DROP INDEX "catalogs"."role_index_key"`);
    await queryRunner.query(`DROP TABLE "catalogs"."c_role"`);
    await queryRunner.query(`DROP INDEX "public"."user_index_key"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP INDEX "public"."login_attempts_index_key"`);
    await queryRunner.query(`DROP TABLE "login_attempts"`);
    await queryRunner.query(`DROP INDEX "public"."module_acl_roles_index_key"`);
    await queryRunner.query(`DROP TABLE "module_acl_roles"`);
    await queryRunner.query(`DROP INDEX "public"."module_acl_index_key"`);
    await queryRunner.query(`DROP TABLE "module_acl"`);
    await queryRunner.query(`DROP INDEX "catalogs"."c_modules_index_key"`);
    await queryRunner.query(`DROP TABLE "catalogs"."c_modules"`);
    await queryRunner.query(`DROP INDEX "catalogs"."c_acl_index_key"`);
    await queryRunner.query(`DROP TABLE "catalogs"."c_acl"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "assessment"`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS catalogs CASCADE`);
  }
}
