import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestionsTableAndOptionsModifiedAgain1720624883641
  implements MigrationInterface
{
  name = 'QuestionsTableAndOptionsModifiedAgain1720624883641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "question" ADD "options" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "options"`);
  }
}
