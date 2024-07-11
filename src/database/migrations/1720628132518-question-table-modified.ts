import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionTableModified1720628132518 implements MigrationInterface {
    name = 'QuestionTableModified1720628132518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branding" RENAME COLUMN "primaryColorBtnText" TO "primaryColorText"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branding" RENAME COLUMN "primaryColorText" TO "primaryColorBtnText"`);
    }

}
