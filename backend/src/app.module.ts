import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealPlannerModule } from './meal-planner/meal-planner.module';

@Module({
  imports: [MealPlannerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
