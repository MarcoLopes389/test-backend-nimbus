"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const get_damage_summary_by_date_use_case_1 = require("./get-damage-summary-by-date.use-case");
const alert_repository_1 = require("../repositories/alert.repository");
const alert_repository_mock_1 = require("../mocks/classes/alert-repository.mock");
let testingModule;
let useCase;
describe('use case tests', () => {
    beforeAll(async () => {
        testingModule = await testing_1.Test.createTestingModule({
            providers: [get_damage_summary_by_date_use_case_1.GetDamageSummaryByDateUseCase, alert_repository_1.AlertRepository],
        })
            .overrideProvider(alert_repository_1.AlertRepository)
            .useValue(new alert_repository_mock_1.AlertRepositoryMock())
            .compile();
        useCase = testingModule.get(get_damage_summary_by_date_use_case_1.GetDamageSummaryByDateUseCase);
    });
    test('should return average, maximum and minimum events daily in date range', async () => {
        const dateStart = '2013-12-22';
        const dateEnd = '2014-01-05';
        const result = await useCase.execute(dateStart, dateEnd);
        const firstResult = result.at(0);
        const lastResult = result.at(result.length - 1);
        expect(firstResult.date.localeCompare(dateEnd)).toEqual(0);
        expect(lastResult.date.localeCompare(dateStart)).toEqual(0);
        for (const event of result) {
            if (event.avgDamage != 0) {
                expect(event.avgDamage).toBeLessThanOrEqual(event.maxDamageEvent.damage);
                expect(event.avgDamage).toBeGreaterThanOrEqual(event.minDamageEvent.damage);
            }
        }
    });
    test('should return all fields as null in a date range not covered', async () => {
        const dateStart = '2023-12-22';
        const dateEnd = '2024-01-05';
        const result = await useCase.execute(dateStart, dateEnd);
        expect(result.length).toBeGreaterThan(0);
        for (const event of result) {
            expect(event.avgDamage).toBe(0);
            expect(event.maxDamageEvent).toBeNull();
            expect(event.minDamageEvent).toBeNull();
        }
    });
});
//# sourceMappingURL=get-damage-summary-by-date.test.js.map