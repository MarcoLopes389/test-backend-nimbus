import { Alert } from '../entities/alert.entity';
import { Injectable } from '@nestjs/common';
import { GroupedAlertsDto } from '../dtos/grouped-alerts.dto';
import moment from 'moment';
import { AlertsReportDto } from '../dtos/alerts-report.dto';
import { AlertRepository } from '../repositories/alert.repository';

@Injectable()
export class GetDamageSummaryByDateUseCase {
  constructor(private readonly alertRepository: AlertRepository) {}

  private groupDates(alerts: Alert[]) {
    return alerts.reduce((result: GroupedAlertsDto[], alert) => {
      const dateAlreadySummarized = result.find(
        ({ date }) => date === alert.date,
      );
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
      } else {
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

  private calcAverageDamage(alerts: GroupedAlertsDto[]): AlertsReportDto[] {
    return alerts
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((summary) => {
        summary.avgDamage =
          Math.ceil(
            summary.damages.reduce((result, damage) => result + damage, 0) /
              summary.damages.length,
          ) || 0;
        Reflect.deleteProperty(summary, 'damages');
        return summary;
      });
  }

  private fillNotFoundDates(
    dateStart: string,
    dateEnd: string,
    groupedAlerts: GroupedAlertsDto[],
  ) {
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
      lastDate = moment(lastDate).add(1, 'd').format('YYYY-MM-DD');
    }

    return groupedAlerts;
  }

  async execute(dateStart: string, dateEnd: string) {
    const alerts = await this.alertRepository.findAllByDate(dateStart, dateEnd);

    const grouped = this.groupDates(alerts);
    const filledAlerts = this.fillNotFoundDates(dateStart, dateEnd, grouped);
    return this.calcAverageDamage(filledAlerts);
  }
}
