const swaggerJsdoc = require("swagger-jsdoc");

module.exports = swaggerJsdoc({
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Nimbus Report API",
        version: "1.0",
        description:
          "This is a simple api to get reports of damages",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./src/router.js"]
})