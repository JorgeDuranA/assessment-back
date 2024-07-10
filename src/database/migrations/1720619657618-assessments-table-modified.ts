import { MigrationInterface, QueryRunner } from "typeorm";

export class AssessmentsTableModified1720619657618 implements MigrationInterface {
    name = 'AssessmentsTableModified1720619657618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "branding" ("id" SERIAL NOT NULL, "logo" character varying NOT NULL, "primaryColorBtn" character varying NOT NULL, "primaryColorBtnText" character varying NOT NULL, CONSTRAINT "PK_e25f376c40ba766f4008a88bbc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assessment" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "assessment" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "questionType"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "option" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "option" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "option" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "option" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "question" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "question" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "question" ADD "questionType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "assessment" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "assessment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "branding"`);
    }

}
