import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Alert1706999636906 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
