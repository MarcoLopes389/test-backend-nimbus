const alertModel = require('../models/alert.model');
const { Op } = require('sequelize')

module.exports = {
    async findByDate(dateStart, dateEnd) {
        return await alertModel.findAll({
            attributes: { exclude: ['id'] },
            where: {
                date: {
                    [Op.gte]: dateStart,
                    [Op.lte]: dateEnd,
                }
            }
        })
    },
};
