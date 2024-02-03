import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Alert } from '../entities/alert.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertRepository {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async findAllByDate(dateStart: string, dateEnd: string) {
    return await this.alertRepository.find({
      select: ['damage', 'date', 'event'],
      where: {
        date: Between(dateStart, dateEnd),
      },
    });
  }
}
