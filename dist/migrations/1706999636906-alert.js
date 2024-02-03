"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert1706999636906 = void 0;
class Alert1706999636906 {
    constructor() {
        this.name = 'Alert1706999636906';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "alert" ("id" SERIAL NOT NULL, "damage" integer NOT NULL, "event" character varying NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_ad91cad659a3536465d564a4b2f" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "alert"`);
    }
}
exports.Alert1706999636906 = Alert1706999636906;
//# sourceMappingURL=1706999636906-alert.js.map