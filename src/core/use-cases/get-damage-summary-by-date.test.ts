import { Test, TestingModule } from '@nestjs/testing';
import { GetDamageSummaryByDateUseCase } from './get-damage-summary-by-date.use-case';
import { AlertRepository } from '../repositories/alert.repository';
import { AlertRepositoryMock } from '../mocks/classes/alert-repository.mock';

let testingModule: TestingModule;
let useCase: GetDamageSummaryByDateUseCase;

describe('use case tests', () => {
  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [GetDamageSummaryByDateUseCase, AlertRepository],
    })
      .overrideProvider(AlertRepository)
      .useValue(new AlertRepositoryMock())
      .compile();
    useCase = testingModule.get(GetDamageSummaryByDateUseCase);
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
        expect(event.avgDamage).toBeLessThanOrEqual(
          event.maxDamageEvent.damage,
        );
        expect(event.avgDamage).toBeGreaterThanOrEqual(
          event.minDamageEvent.damage,
        );
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
