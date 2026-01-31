import { Module } from '@nestjs/common';
import { MealPlannerController } from './meal-planner.controller';
import { MealPlannerService } from './meal-planner.service';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [MealPlannerController],
    providers: [MealPlannerService, PrismaService],
})
export class MealPlannerModule { }
