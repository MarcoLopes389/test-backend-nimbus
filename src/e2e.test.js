const supertest = require("supertest")
const app = require("./main")
const successAlertMock = require("./use-cases/get-damage-summary-by-date/mocks/success-alert.mock")
const alertRepository = require("./repositories/alert.repository")

describe('e2e tests', () => {
    test('should return 404 if a date out of range is sent', async () => {
        jest.spyOn(alertRepository, 'findByDate').mockReturnValue(
            successAlertMock.filter((alert) => alert.date >= '2023-12-14' && alert.date <= '2024-01-09')
        )
        const result = await supertest(app).get('/damage-summary-by-date?dateStart=2023-12-14&dateEnd=2024-01-09')
        expect(result.body.message).toEqual(expect.stringContaining('Nenhum alerta'))
        expect(result.statusCode).toBe(404)
    })

    test('should return 400 if one of date is not sent', async () => {
        const result = await supertest(app).get('/damage-summary-by-date?dateStart=2023-12-14')
        expect(result.body.message).toEqual(expect.stringContaining('precisa enviar'))
        expect(result.statusCode).toBe(400)
    })

    test('should return 400 if dateStart is greater than dateEnd', async () => {
        const result = await supertest(app).get('/damage-summary-by-date?dateStart=2025-12-14&dateEnd=2024-01-09')
        expect(result.body.message).toEqual(expect.stringContaining('inferior'))
        expect(result.statusCode).toBe(400)
    })

    test('should return 200 if all is ok', async () => {
        jest.spyOn(alertRepository, 'findByDate').mockReturnValue(
            successAlertMock.filter((alert) => alert.date >= '2013-12-14' && alert.date <= '2014-01-09')
        )
        const result = await supertest(app).get('/damage-summary-by-date?dateStart=2013-12-14&dateEnd=2014-01-09')
        expect(result.statusCode).toBe(200)
        expect(result.body.data).not.toBeNull()
        expect(result.body.data.length).toBeGreaterThan(0)
    })
})