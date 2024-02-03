const useCase = require('./use-case');

module.exports = {
    async execute(req, res) {
        const { dateStart, dateEnd } = req.query

        if (!dateStart || !dateEnd) {
            return res.status(400).json({
                status: 400,
                message: 'Você precisa enviar uma faixa de tempo.'
            })
        }

        if (new Date(dateStart) > new Date(dateEnd)) {
            return res.status(400).json({
                status: 400,
                message: 'Data inicial não pode ser inferior à data final.'
            })
        }

        const result = await useCase.execute(dateStart, dateEnd)

        if (result.length > 0) {
            return res.status(200).json({
                data: result
            })
        }

        return res.status(404).json({
            status: 404,
            message: 'Nenhum alerta encontrado para a faixa de tempo passada.'
        })
    },
};
