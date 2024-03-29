const moment = require('moment');
const repository = require('../repositories/alert.repository');

module.exports = {
    async execute(dateStart, dateEnd) {
        const alerts = await repository.findByDate(dateStart, dateEnd);

        const grouped = alerts
            .reduce((result, alert) => {
                const dateAlreadySummarized = result.find(({ date }) => date === alert.date);
                const {
                    damages: oldDamages,
                    maxDamageEvent: oldMaxDamageEvent,
                    minDamageEvent: oldMinDamageEvent,
                } = { ...dateAlreadySummarized };
                const date = alert.date;
                const damages = (oldDamages || []).concat([alert.damage]);

                let maxDamageEvent = {
                    damage: alert.damage,
                    event: alert.event,
                };
                if (oldMaxDamageEvent && oldMaxDamageEvent.damage > alert.damage) {
                    maxDamageEvent = {
                        damage: oldMaxDamageEvent.damage,
                        event: oldMaxDamageEvent.event,
                    };
                }

                let minDamageEvent = {
                    damage: alert.damage,
                    event: alert.event,
                };
                if (oldMinDamageEvent && oldMinDamageEvent.damage < alert.damage) {
                    minDamageEvent = {
                        damage: oldMinDamageEvent.damage,
                        event: oldMinDamageEvent.event,
                    };
                }

                if (dateAlreadySummarized) {
                    dateAlreadySummarized.damages = damages;
                    dateAlreadySummarized.maxDamageEvent = maxDamageEvent;
                    dateAlreadySummarized.minDamageEvent = minDamageEvent;
                }
                else {
                    result.push({
                        date,
                        damages,
                        maxDamageEvent,
                        minDamageEvent,
                    });
                }

                return result;
            }, [])
        
        let lastDate = dateStart;

        // Notei que na resposta as datas que estavam no range e não possuíam dados deveria ser feito um preenchimento
        while (lastDate <= dateEnd) {
            if (!grouped.find(({ date }) => lastDate == date)) {
                grouped.push({
                    damages: [],
                    date: lastDate,
                    maxDamageEvent: null,
                    minDamageEvent: null,
                })
            }
            lastDate = moment(lastDate).add(1, 'd').format('YYYY-MM-DD')
        }
        
        return grouped
            .sort((a, b) => b.date.localeCompare(a.date))
            .map(summary => {
                const avgDamage = Math.ceil(
                    summary.damages.reduce((result, damage) => result + damage, 0) / summary.damages.length
                ) || 0
            
                return {
                    date: summary.date,
                    avgDamage,
                    maxDamageEvent: summary.maxDamageEvent,
                    minDamageEvent: summary.minDamageEvent
                };
            });
    },
};
