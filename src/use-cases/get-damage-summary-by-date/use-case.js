const repository = require('../../repositories/alert.repository');

module.exports = {
    async execute(dateStart, dateEnd) {
        const dbAlerts = await repository.findByDate(dateStart, dateEnd);

        return dbAlerts
            .reduce((result, alert) => {
                const dateAlreadySummarized = result.find(({ date }) => date === alert.date);
                const {
                    damages: oldDamages,
                    maxDamageEvent: oldMaxDamageEvent,
                    minDamageEvent: oldMinDamageEvent,
                } = { ...dateAlreadySummarized };
                const date = alert.date;
                const damages = (oldDamages || []).concat([alert.damage]);
                let maxDamageEvent = alert;
                if (oldMaxDamageEvent && oldMaxDamageEvent.damage > alert.damage) {
                    maxDamageEvent = oldMaxDamageEvent;
                }
                let minDamageEvent = alert;;
                if (oldMinDamageEvent && oldMinDamageEvent.damage < alert.damage) {
                    minDamageEvent = oldMinDamageEvent;
                }

                Reflect.deleteProperty(maxDamageEvent, 'date')
                Reflect.deleteProperty(minDamageEvent, 'date')

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
            .sort((a, b) => b.date.localeCompare(a.date))
            .map(summary => {
                summary.avgDamage = Math.ceil(
                    summary.damages.reduce((result, damage) => result + damage, 0) / summary.damages.length
                )
                Reflect.deleteProperty(summary, 'damages');
                return summary;
            });
    },
};
