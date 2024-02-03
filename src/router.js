const router = require('express').Router()
const endpoint = require('./use-cases/get-damage-summary-by-date/endpoint')

/**
 * @swagger
 * /damage-summary-by-date:
 *   get:
 *     summary: Retrieve a list of alert damages grouped by date
 *     description: Retrieve a list of alert damages grouped by date. All the dates have a max and min damage events and the average damage.
 *     parameters:
 *        - in: query
 *          name: dateStart
 *          required: true
 *          description: The start date of range
 *          schema:
 *             type: string
 *        - in: query
 *          name: dateEnd
 *          required: true
 *          description: The end date of range
 *          schema:
 *             type: string
 *     responses:
 *          200:
 *              description: Created
 *              content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        data:
 *                          type: array
*/
router.get('/damage-summary-by-date', endpoint.execute)

module.exports = router