const router = require('express').Router()
const endpoint = require('./use-cases/get-damage-summary-by-date/endpoint')

router.get('/damage-summary-by-date', endpoint.execute)

module.exports = router