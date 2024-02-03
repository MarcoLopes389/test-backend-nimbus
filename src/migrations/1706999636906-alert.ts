import { MigrationInterface, QueryRunner } from 'typeorm';

export class Alert1706999636906 implements MigrationInterface {
  name = 'Alert1706999636906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "alert" ("id" SERIAL NOT NULL, "damage" integer NOT NULL, "event" character varying NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_ad91cad659a3536465d564a4b2f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "alert"`);
  }
}
