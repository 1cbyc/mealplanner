import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MealClass } from '@prisma/client';

interface MealCombination {
    primary: MealClass;
    secondary?: MealClass;
}

interface CompatibilityRule {
    primary: MealClass;
    requiresSecondary: boolean;
    allowedSecondaries?: MealClass[];
}

@Injectable()
export class MealPlannerService {
    constructor(private prisma: PrismaService) { }

    // Nigerian Meal Compatibility Matrix
    private readonly compatibilityRules: CompatibilityRule[] = [
        // Rule 1: SWALLOW requires SOUP
        {
            primary: MealClass.SWALLOW,
            requiresSecondary: true,
            allowedSecondaries: [MealClass.SOUP],
        },
        // Rule 2: RICE_PLAIN requires SAUCE
        {
            primary: MealClass.RICE_PLAIN,
            requiresSecondary: true,
            allowedSecondaries: [MealClass.SAUCE],
        },
        // Rule 3: TUBER_BOILED requires SAUCE
        {
            primary: MealClass.TUBER_BOILED,
            requiresSecondary: true,
            allowedSecondaries: [MealClass.SAUCE],
        },
        // Rule 4: RICE_ONEPOT is standalone (but can have optional sides)
        {
            primary: MealClass.RICE_ONEPOT,
            requiresSecondary: false,
            allowedSecondaries: [MealClass.SIDE], // Optional
        },
        // Rule 5: LEGUME is standalone (but can have optional sides)
        {
            primary: MealClass.LEGUME,
            requiresSecondary: false,
            allowedSecondaries: [MealClass.SIDE], // Optional
        },
        // Rule 6: LIGHT is standalone (typically breakfast)
        {
            primary: MealClass.LIGHT,
            requiresSecondary: false,
            allowedSecondaries: [MealClass.SIDE, MealClass.LEGUME], // Pap + Akara
        },
    ];

    /**
     * Check if a meal combination is valid according to Nigerian food rules
     */
    private isValidCombination(
        primaryClass: MealClass,
        secondaryClass?: MealClass,
    ): boolean {
        const rule = this.compatibilityRules.find((r) => r.primary === primaryClass);

        if (!rule) {
            // If no rule exists, assume standalone is OK
            return secondaryClass === undefined;
        }

        // If the rule requires a secondary but none provided
        if (rule.requiresSecondary && !secondaryClass) {
            return false;
        }

        // If a secondary is provided, check if it's allowed
        if (secondaryClass) {
            return rule.allowedSecondaries?.includes(secondaryClass) || false;
        }

        // If no secondary is provided and it's not required
        return !rule.requiresSecondary;
    }

    /**
     * Get a random dish from a specific meal class
     */
    private async getRandomDish(mealClass: MealClass) {
        const dishes = await this.prisma.dish.findMany({
            where: { mealClass, isActive: true },
        });

        if (dishes.length === 0) {
            throw new Error(`No dishes found for meal class: ${mealClass}`);
        }

        const randomIndex = Math.floor(Math.random() * dishes.length);
        return dishes[randomIndex];
    }

    /**
     * Generate a valid meal for a specific meal time
     */
    private async generateMeal(mealTime: 'breakfast' | 'lunch' | 'dinner') {
        let primaryDish;
        let secondaryDish = null;

        if (mealTime === 'breakfast') {
            // Breakfast: Typically light meals or legumes
            const mealClasses = [MealClass.LIGHT, MealClass.LEGUME];
            const selectedClass = mealClasses[Math.floor(Math.random() * mealClasses.length)];
            primaryDish = await this.getRandomDish(selectedClass);

            // Optional: Add Akara to Pap
            if (selectedClass === MealClass.LIGHT && Math.random() > 0.5) {
                secondaryDish = await this.getRandomDish(MealClass.LEGUME);
            }
        } else {
            // Lunch/Dinner: More substantial meals
            const heavyMealClasses = [
                MealClass.SWALLOW,
                MealClass.RICE_PLAIN,
                MealClass.RICE_ONEPOT,
                MealClass.LEGUME,
            ];

            const selectedClass = heavyMealClasses[Math.floor(Math.random() * heavyMealClasses.length)];
            primaryDish = await this.getRandomDish(selectedClass);

            const rule = this.compatibilityRules.find((r) => r.primary === selectedClass);

            if (rule?.requiresSecondary && rule.allowedSecondaries) {
                // MUST pair with required secondary
                const secondaryClass = rule.allowedSecondaries[0];
                secondaryDish = await this.getRandomDish(secondaryClass);
            } else if (rule?.allowedSecondaries && Math.random() > 0.5) {
                // Optional side dish
                const secondaryClass = rule.allowedSecondaries[0];
                secondaryDish = await this.getRandomDish(secondaryClass);
            }
        }

        return {
            primaryDish,
            secondaryDish,
        };
    }

    /**
     * Generate a weekly meal plan (7 days)
     */
    async generateWeeklyPlan() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weekPlan = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            const breakfast = await this.generateMeal('breakfast');
            const lunch = await this.generateMeal('lunch');
            const dinner = await this.generateMeal('dinner');

            // Validate combinations
            if (
                !this.isValidCombination(
                    breakfast.primaryDish.mealClass,
                    breakfast.secondaryDish?.mealClass,
                ) ||
                !this.isValidCombination(
                    lunch.primaryDish.mealClass,
                    lunch.secondaryDish?.mealClass,
                ) ||
                !this.isValidCombination(
                    dinner.primaryDish.mealClass,
                    dinner.secondaryDish?.mealClass,
                )
            ) {
                throw new Error('Generated invalid meal combination!');
            }

            // Check if MenuDay already exists for this date
            const existing = await this.prisma.menuDay.findUnique({
                where: { date: currentDate },
            });

            if (existing) {
                // Update existing
                await this.prisma.menuDay.update({
                    where: { date: currentDate },
                    data: {
                        breakfastDishId: breakfast.primaryDish.id,
                        lunchDishId: lunch.primaryDish.id,
                        lunchSecondaryDishId: lunch.secondaryDish?.id,
                        dinnerDishId: dinner.primaryDish.id,
                        dinnerSecondaryDishId: dinner.secondaryDish?.id,
                    },
                });
            } else {
                // Create new
                await this.prisma.menuDay.create({
                    data: {
                        date: currentDate,
                        breakfastDishId: breakfast.primaryDish.id,
                        lunchDishId: lunch.primaryDish.id,
                        lunchSecondaryDishId: lunch.secondaryDish?.id,
                        dinnerDishId: dinner.primaryDish.id,
                        dinnerSecondaryDishId: dinner.secondaryDish?.id,
                    },
                });
            }

            weekPlan.push({
                date: currentDate,
                breakfast: {
                    primary: breakfast.primaryDish,
                    secondary: breakfast.secondaryDish,
                },
                lunch: {
                    primary: lunch.primaryDish,
                    secondary: lunch.secondaryDish,
                },
                dinner: {
                    primary: dinner.primaryDish,
                    secondary: dinner.secondaryDish,
                },
            });
        }

        return weekPlan;
    }

    /**
     * Get current meal plan for today
     */
    async getCurrentPlan() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const menuDay = await this.prisma.menuDay.findUnique({
            where: { date: today },
            include: {
                breakfastDish: true,
                lunchDish: true,
                lunchSecondaryDish: true,
                dinnerDish: true,
                dinnerSecondaryDish: true,
            },
        });

        return menuDay;
    }

    /**
     * Swap a specific meal (breakfast, lunch, or dinner) for today
     */
    async swapMeal(mealTime: 'breakfast' | 'lunch' | 'dinner') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const menuDay = await this.prisma.menuDay.findUnique({
            where: { date: today },
        });

        if (!menuDay) {
            throw new Error('No meal plan found for today. Generate a plan first.');
        }

        const newMeal = await this.generateMeal(mealTime);

        const updateData: any = {};
        if (mealTime === 'breakfast') {
            updateData.breakfastDishId = newMeal.primaryDish.id;
        } else if (mealTime === 'lunch') {
            updateData.lunchDishId = newMeal.primaryDish.id;
            updateData.lunchSecondaryDishId = newMeal.secondaryDish?.id || null;
        } else {
            updateData.dinnerDishId = newMeal.primaryDish.id;
            updateData.dinnerSecondaryDishId = newMeal.secondaryDish?.id || null;
        }

        const updated = await this.prisma.menuDay.update({
            where: { date: today },
            data: updateData,
            include: {
                breakfastDish: true,
                lunchDish: true,
                lunchSecondaryDish: true,
                dinnerDish: true,
                dinnerSecondaryDish: true,
            },
        });

        return updated;
    }
}
