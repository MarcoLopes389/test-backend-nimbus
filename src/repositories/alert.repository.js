const data = require('../../data/alerts.json');
const alertModel = require('../models/alert.model');
const { Op } = require('sequelize')

module.exports = {
    async findByDate(dateStart, dateEnd) {
        return await alertModel.findAll({
            where: {
                date: {
                    [Op.gte]: dateStart,
                    [Op.lte]: dateEnd,
                }
            }
        })
    },
};
