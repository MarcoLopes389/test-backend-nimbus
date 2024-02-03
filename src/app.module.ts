import { Module } from '@nestjs/common';
import { AlertController } from './core/controllers/alert.controller';
import { GetDamageSummaryByDateUseCase } from './core/use-cases/get-damage-summary-by-date.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { Alert } from './core/entities/alert.entity';
import { AlertRepository } from './core/repositories/alert.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([Alert]),
  ],
  controllers: [AlertController],
  providers: [GetDamageSummaryByDateUseCase, AlertRepository],
})
export class AppModule {}
