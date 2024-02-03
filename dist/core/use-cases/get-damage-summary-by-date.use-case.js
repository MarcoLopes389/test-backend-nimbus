"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDamageSummaryByDateUseCase = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
const alert_repository_1 = require("../repositories/alert.repository");
let GetDamageSummaryByDateUseCase = class GetDamageSummaryByDateUseCase {
    constructor(alertRepository) {
        this.alertRepository = alertRepository;
    }
    groupDates(alerts) {
        return alerts.reduce((result, alert) => {
            const dateAlreadySummarized = result.find(({ date }) => date === alert.date);
            const { damages: oldDamages, maxDamageEvent: oldMaxDamageEvent, minDamageEvent: oldMinDamageEvent, } = { ...dateAlreadySummarized };
            const date = alert.date;
            const damages = (oldDamages || []).concat([alert.damage]);
            let maxDamageEvent = alert;
            if (oldMaxDamageEvent && oldMaxDamageEvent.damage > alert.damage) {
                maxDamageEvent = oldMaxDamageEvent;
            }
            let minDamageEvent = alert;
            if (oldMinDamageEvent && oldMinDamageEvent.damage < alert.damage) {
                minDamageEvent = oldMinDamageEvent;
            }
            Reflect.deleteProperty(maxDamageEvent, 'date');
            Reflect.deleteProperty(minDamageEvent, 'date');
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
        }, []);
    }
    calcAverageDamage(alerts) {
        return alerts
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((summary) => {
            summary.avgDamage =
                Math.ceil(summary.damages.reduce((result, damage) => result + damage, 0) /
                    summary.damages.length) || 0;
            Reflect.deleteProperty(summary, 'damages');
            return summary;
        });
    }
    fillNotFoundDates(dateStart, dateEnd, groupedAlerts) {
        let lastDate = dateStart;
        while (lastDate <= dateEnd) {
            if (!groupedAlerts.find(({ date }) => lastDate == date)) {
                groupedAlerts.push({
                    damages: [],
                    date: lastDate,
                    maxDamageEvent: null,
                    minDamageEvent: null,
                });
            }
            lastDate = (0, moment_1.default)(lastDate).add(1, 'd').format('YYYY-MM-DD');
        }
        return groupedAlerts;
    }
    async execute(dateStart, dateEnd) {
        const alerts = await this.alertRepository.findAllByDate(dateStart, dateEnd);
        const grouped = this.groupDates(alerts);
        const filledAlerts = this.fillNotFoundDates(dateStart, dateEnd, grouped);
        return this.calcAverageDamage(filledAlerts);
    }
};
exports.GetDamageSummaryByDateUseCase = GetDamageSummaryByDateUseCase;
exports.GetDamageSummaryByDateUseCase = GetDamageSummaryByDateUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [alert_repository_1.AlertRepository])
], GetDamageSummaryByDateUseCase);
//# sourceMappingURL=get-damage-summary-by-date.use-case.js.map