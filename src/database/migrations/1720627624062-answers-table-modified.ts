import { MigrationInterface, QueryRunner } from "typeorm";

export class AnswersTableModified1720627624062 implements MigrationInterface {
    name = 'AnswersTableModified1720627624062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "answerText" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "answerValue" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "answerValue" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "answerText" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "answer" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
