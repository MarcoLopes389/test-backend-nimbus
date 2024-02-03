const express = require('express')
const app = express()
const router = require('./router')
const swaggerUi = require("swagger-ui-express");
const spec = require('./config/swagger')

app.use(express.json())
app.use(router)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(spec))

module.exports = app