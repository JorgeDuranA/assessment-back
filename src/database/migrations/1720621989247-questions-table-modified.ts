import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionsTableModified1720621989247 implements MigrationInterface {
    name = 'QuestionsTableModified1720621989247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "option" DROP COLUMN "optionText"`);
        await queryRunner.query(`ALTER TABLE "option" DROP COLUMN "optionValue"`);
        await queryRunner.query(`ALTER TABLE "option" ADD "text" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "option" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "option" ADD "optionValue" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "option" ADD "optionText" character varying NOT NULL`);
    }

}
