const useCase = require('./use-case');
const repository = require('../../repositories/alert.repository');
const successAlertMock = require('./mocks/success-alert.mock');

describe('use case tests', () => {
    test('should return average, maximum and minimum events daily in date range', async () => {
        const dateStart = '2013-12-22';
        const dateEnd = '2014-01-05';

        jest.spyOn(repository, 'findByDate').mockReturnValue(
            successAlertMock.filter((alert) => alert.date >= dateStart && alert.date <= dateEnd)
        )
    
        const result = await useCase.execute(dateStart, dateEnd);
        const firstResult = result.at(0)
        const lastResult = result.at(result.length - 1)
    
        expect(firstResult.date.localeCompare(dateEnd)).toEqual(0)
        expect(lastResult.date.localeCompare(dateStart)).toEqual(0)

        for (const event of result) {
            expect(event.avgDamage).toBeLessThanOrEqual(event.maxDamageEvent.damage)
            expect(event.avgDamage).toBeGreaterThanOrEqual(event.minDamageEvent.damage)
        }
    });

    test('should not return anything in a date range not covered', async () => {
        const dateStart = '2023-12-22';
        const dateEnd = '2024-01-05';

        jest.spyOn(repository, 'findByDate').mockReturnValue(
            successAlertMock.filter((alert) => alert.date >= dateStart && alert.date <= dateEnd)
        )

        const result = await useCase.execute(dateStart, dateEnd);
        expect(result.length).toBe(0)
    })
})
