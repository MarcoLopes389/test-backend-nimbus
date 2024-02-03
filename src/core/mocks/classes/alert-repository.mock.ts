import { Injectable } from '@nestjs/common';
import { successAlertMock } from '../values/success-alert.mock';

@Injectable()
export class AlertRepositoryMock {
  async findAllByDate(dateStart: string, dateEnd: string) {
    return successAlertMock.filter(
      (alert) => alert.date >= dateStart && alert.date <= dateEnd,
    );
  }
}
