import { Controller, Get, Post, Param } from '@nestjs/common';
import { MealPlannerService } from './meal-planner.service';

@Controller('meal-planner')
export class MealPlannerController {
    constructor(private readonly mealPlannerService: MealPlannerService) { }

    @Post('generate')
    async generateWeeklyPlan() {
        return this.mealPlannerService.generateWeeklyPlan();
    }

    @Get('current')
    async getCurrentPlan() {
        return this.mealPlannerService.getCurrentPlan();
    }

    @Post('swap/:mealTime')
    async swapMeal(@Param('mealTime') mealTime: 'breakfast' | 'lunch' | 'dinner') {
        return this.mealPlannerService.swapMeal(mealTime);
    }
}
