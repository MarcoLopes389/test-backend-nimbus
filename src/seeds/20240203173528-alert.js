'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('alert', [
      {
          date: "2013-12-17",
          event: "Chuva 10 mm",
          damage: 35
      },
      {
          date: "2013-12-17",
          event: "Vento 12 m/s",
          damage: 87
      },
      {
          date: "2013-12-17",
          event: "Ocorrência de raios a 20 km",
          damage: 51
      },
      {
          date: "2013-12-18",
          event: "Temperatura acima de 40°C",
          damage: 72
      },
      {
          date: "2013-12-18",
          event: "Pancada de chuva forte",
          damage: 93
      },
      {
          date: "2013-12-19",
          event: "Chuva 6 mm",
          damage: 23
      },
      {
          date: "2013-12-19",
          event: "Vento 6 m/s",
          damage: 53
      },
      {
          date: "2013-12-20",
          event: "Rajada acima de 30 m/s",
          damage: 65
      },
      {
          date: "2013-12-21",
          event: "Pancada de chuva",
          damage: 71
      },
      {
          date: "2013-12-21",
          event: "Temperatura acima de 35°C",
          damage: 62
      },
      {
          date: "2013-12-22",
          event: "Chuva 12 mm",
          damage: 63
      },
      {
          date: "2013-12-22",
          event: "Vento 8 m/s",
          damage: 68
      },
      {
          date: "2013-12-24",
          event: "Rajada acima de 25 m/s",
          damage: 52
      },
      {
          date: "2013-12-24",
          event: "Ocorrência de raios a 5 km",
          damage: 96
      },
      {
          date: "2013-12-24",
          event: "Temperatura acima de 42°C",
          damage: 85
      },
      {
          date: "2013-12-26",
          event: "Chuva 3 mm",
          damage: 15
      },
      {
          date: "2013-12-26",
          event: "Vento 10 m/s",
          damage: 73
      },
      {
          date: "2013-12-27",
          event: "Pancada de chuva forte",
          damage: 91
      },
      {
          date: "2013-12-27",
          event: "Rajada acima de 32 m/s",
          damage: 82
      },
      {
          date: "2013-12-28",
          event: "Temperatura acima de 37°C",
          damage: 65
      },
      {
          date: "2013-12-28",
          event: "Chuva 3 mm",
          damage: 13
      },
      {
          date: "2013-12-29",
          event: "Vento 6 m/s",
          damage: 56
      },
      {
          date: "2013-12-30",
          event: "Ocorrência de raios a 12 km",
          damage: 42
      },
      {
          date: "2013-12-30",
          event: "Pancada de chuva forte",
          damage: 90
      },
      {
          date: "2013-12-31",
          event: "Temperatura acima de 39°C",
          damage: 69
      },
      {
          date: "2013-12-31",
          event: "Chuva 11 mm",
          damage: 42
      },
      {
          date: "2014-01-04",
          event: "Vento 9 m/s",
          damage: 73
      },
      {
          date: "2014-01-04",
          event: "Ocorrência de raios a 17 km",
          damage: 48
      },
      {
          date: "2014-01-04",
          event: "Rajada acima de 23 m/s",
          damage: 51
      },
      {
          date: "2014-01-05",
          event: "Temperatura acima de 36°C",
          damage: 63
      },
      {
          date: "2014-01-05",
          event: "Chuva 12 mm",
          damage: 59
      },
      {
          date: "2014-01-05",
          event: "Vento 8 m/s",
          damage: 68
      },
      {
          date: "2014-01-05",
          event: "Pancada de chuva",
          damage: 82
      },
      {
          date: "2014-01-07",
          event: "Rajada acima de 29 m/s",
          damage: 61
      },
      {
          date: "2014-01-08",
          event: "Ocorrência de raios a 30 km",
          damage: 32
      },
      {
          date: "2014-01-08",
          event: "Chuva 5 mm",
          damage: 23
      },
      {
          date: "2014-01-09",
          event: "Vento 10 m/s",
          damage: 75
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
