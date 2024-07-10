import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionsTableAndOptionsModified1720623514517 implements MigrationInterface {
    name = 'QuestionsTableAndOptionsModified1720623514517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "option" RENAME COLUMN "text" TO "options"`);
        await queryRunner.query(`ALTER TABLE "option" DROP COLUMN "options"`);
        await queryRunner.query(`ALTER TABLE "option" ADD "options" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "option" DROP COLUMN "options"`);
        await queryRunner.query(`ALTER TABLE "option" ADD "options" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "option" RENAME COLUMN "options" TO "text"`);
    }

}
