import { PrismaClient, MealClass, MarketCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌾 Seeding NaijaNourish database...');

    // Create Ingredients
    console.log('📦 Creating ingredients...');

    const rice = await prisma.ingredient.upsert({
        where: { name: 'Rice' },
        update: {},
        create: { name: 'Rice', marketCategory: MarketCategory.GRAINS },
    });

    const garri = await prisma.ingredient.upsert({
        where: { name: 'Garri' },
        update: {},
        create: { name: 'Garri', marketCategory: MarketCategory.GRAINS },
    });

    const semovita = await prisma.ingredient.upsert({
        where: { name: 'Semovita' },
        update: {},
        create: { name: 'Semovita', marketCategory: MarketCategory.GRAINS },
    });

    const yam = await prisma.ingredient.upsert({
        where: { name: 'Yam' },
        update: {},
        create: { name: 'Yam', marketCategory: MarketCategory.TUBERS },
    });

    const plantain = await prisma.ingredient.upsert({
        where: { name: 'Plantain' },
        update: {},
        create: { name: 'Plantain', marketCategory: MarketCategory.TUBERS },
    });

    const beans = await prisma.ingredient.upsert({
        where: { name: 'Beans' },
        update: {},
        create: { name: 'Beans', marketCategory: MarketCategory.GRAINS },
    });

    const egusi = await prisma.ingredient.upsert({
        where: { name: 'Egusi (Melon Seeds)' },
        update: {},
        create: { name: 'Egusi (Melon Seeds)', marketCategory: MarketCategory.GRAINS },
    });

    const ogbono = await prisma.ingredient.upsert({
        where: { name: 'Ogbono' },
        update: {},
        create: { name: 'Ogbono', marketCategory: MarketCategory.GRAINS },
    });

    const efo = await prisma.ingredient.upsert({
        where: { name: 'Efo (Spinach)' },
        update: {},
        create: { name: 'Efo (Spinach)', marketCategory: MarketCategory.VEGETABLES },
    });

    const tomato = await prisma.ingredient.upsert({
        where: { name: 'Tomatoes' },
        update: {},
        create: { name: 'Tomatoes', marketCategory: MarketCategory.VEGETABLES },
    });

    const pepper = await prisma.ingredient.upsert({
        where: { name: 'Pepper' },
        update: {},
        create: { name: 'Pepper', marketCategory: MarketCategory.VEGETABLES },
    });

    const onion = await prisma.ingredient.upsert({
        where: { name: 'Onions' },
        update: {},
        create: { name: 'Onions', marketCategory: MarketCategory.VEGETABLES },
    });

    const chicken = await prisma.ingredient.upsert({
        where: { name: 'Chicken' },
        update: {},
        create: { name: 'Chicken', marketCategory: MarketCategory.PROTEIN },
    });

    const beef = await prisma.ingredient.upsert({
        where: { name: 'Beef' },
        update: {},
        create: { name: 'Beef', marketCategory: MarketCategory.PROTEIN },
    });

    const fish = await prisma.ingredient.upsert({
        where: { name: 'Fish' },
        update: {},
        create: { name: 'Fish', marketCategory: MarketCategory.PROTEIN },
    });

    const eggs = await prisma.ingredient.upsert({
        where: { name: 'Eggs' },
        update: {},
        create: { name: 'Eggs', marketCategory: MarketCategory.PROTEIN },
    });

    const palmOil = await prisma.ingredient.upsert({
        where: { name: 'Palm Oil' },
        update: {},
        create: { name: 'Palm Oil', marketCategory: MarketCategory.OILS },
    });

    const vegetableOil = await prisma.ingredient.upsert({
        where: { name: 'Vegetable Oil' },
        update: {},
        create: { name: 'Vegetable Oil', marketCategory: MarketCategory.OILS },
    });

    const cornFlour = await prisma.ingredient.upsert({
        where: { name: 'Corn Flour (Pap)' },
        update: {},
        create: { name: 'Corn Flour (Pap)', marketCategory: MarketCategory.GRAINS },
    });

    console.log('✅ Ingredients created');

    // Create 15 Essential Nigerian Dishes
    console.log('🍽️  Creating dishes...');

    // 1. Jollof Rice (RICE_ONEPOT - Standalone)
    await prisma.dish.upsert({
        where: { name: 'Jollof Rice' },
        update: {},
        create: {
            name: 'Jollof Rice',
            mealClass: MealClass.RICE_ONEPOT,
            defaultCalories: 450,
            preparationTimeMin: 45,
            ingredients: {
                create: [
                    { ingredientId: rice.id, quantity: '3 cups' },
                    { ingredientId: tomato.id, quantity: '4 large' },
                    { ingredientId: pepper.id, quantity: '2 scotch bonnet' },
                    { ingredientId: onion.id, quantity: '1 large' },
                    { ingredientId: chicken.id, quantity: '500g', isOptional: true },
                    { ingredientId: vegetableOil.id, quantity: '1/4 cup' },
                ],
            },
        },
    });

    // 2. Fried Rice (RICE_ONEPOT - Standalone)
    await prisma.dish.upsert({
        where: { name: 'Fried Rice' },
        update: {},
        create: {
            name: 'Fried Rice',
            mealClass: MealClass.RICE_ONEPOT,
            defaultCalories: 420,
            preparationTimeMin: 40,
            ingredients: {
                create: [
                    { ingredientId: rice.id, quantity: '3 cups' },
                    { ingredientId: onion.id, quantity: '1 large' },
                    { ingredientId: pepper.id, quantity: '1' },
                    { ingredientId: chicken.id, quantity: '300g', isOptional: true },
                    { ingredientId: vegetableOil.id, quantity: '3 tbsp' },
                ],
            },
        },
    });

    // 3. White Rice (RICE_PLAIN - Requires Sauce)
    await prisma.dish.upsert({
        where: { name: 'White Rice' },
        update: {},
        create: {
            name: 'White Rice',
            mealClass: MealClass.RICE_PLAIN,
            defaultCalories: 200,
            preparationTimeMin: 25,
            ingredients: {
                create: [{ ingredientId: rice.id, quantity: '3 cups' }],
            },
        },
    });

    // 4. Tomato Stew (SAUCE)
    await prisma.dish.upsert({
        where: { name: 'Tomato Stew' },
        update: {},
        create: {
            name: 'Tomato Stew',
            mealClass: MealClass.SAUCE,
            defaultCalories: 180,
            preparationTimeMin: 30,
            ingredients: {
                create: [
                    { ingredientId: tomato.id, quantity: '6 large' },
                    { ingredientId: pepper.id, quantity: '3 scotch bonnet' },
                    { ingredientId: onion.id, quantity: '2 medium' },
                    { ingredientId: chicken.id, quantity: '500g', isOptional: true },
                    { ingredientId: vegetableOil.id, quantity: '1/2 cup' },
                ],
            },
        },
    });

    // 5. Eba (SWALLOW - Requires Soup)
    await prisma.dish.upsert({
        where: { name: 'Eba' },
        update: {},
        create: {
            name: 'Eba',
            mealClass: MealClass.SWALLOW,
            defaultCalories: 300,
            preparationTimeMin: 10,
            ingredients: {
                create: [{ ingredientId: garri.id, quantity: '2 cups' }],
            },
        },
    });

    // 6. Pounded Yam (SWALLOW - Requires Soup)
    await prisma.dish.upsert({
        where: { name: 'Pounded Yam' },
        update: {},
        create: {
            name: 'Pounded Yam',
            mealClass: MealClass.SWALLOW,
            defaultCalories: 350,
            preparationTimeMin: 40,
            ingredients: {
                create: [{ ingredientId: yam.id, quantity: '1 large tuber' }],
            },
        },
    });

    // 7. Semo (SWALLOW - Requires Soup)
    await prisma.dish.upsert({
        where: { name: 'Semo' },
        update: {},
        create: {
            name: 'Semo',
            mealClass: MealClass.SWALLOW,
            defaultCalories: 320,
            preparationTimeMin: 15,
            ingredients: {
                create: [{ ingredientId: semovita.id, quantity: '2 cups' }],
            },
        },
    });

    // 8. Egusi Soup (SOUP)
    await prisma.dish.upsert({
        where: { name: 'Egusi Soup' },
        update: {},
        create: {
            name: 'Egusi Soup',
            mealClass: MealClass.SOUP,
            defaultCalories: 280,
            preparationTimeMin: 50,
            ingredients: {
                create: [
                    { ingredientId: egusi.id, quantity: '2 cups' },
                    { ingredientId: pepper.id, quantity: '2' },
                    { ingredientId: onion.id, quantity: '1' },
                    { ingredientId: beef.id, quantity: '500g', isOptional: true },
                    { ingredientId: fish.id, quantity: '200g', isOptional: true },
                    { ingredientId: palmOil.id, quantity: '1/2 cup' },
                ],
            },
        },
    });

    // 9. Ogbono Soup (SOUP)
    await prisma.dish.upsert({
        where: { name: 'Ogbono Soup' },
        update: {},
        create: {
            name: 'Ogbono Soup',
            mealClass: MealClass.SOUP,
            defaultCalories: 260,
            preparationTimeMin: 40,
            ingredients: {
                create: [
                    { ingredientId: ogbono.id, quantity: '1 cup' },
                    { ingredientId: pepper.id, quantity: '2' },
                    { ingredientId: beef.id, quantity: '400g', isOptional: true },
                    { ingredientId: palmOil.id, quantity: '1/4 cup' },
                ],
            },
        },
    });

    // 10. Efo Riro (SOUP)
    await prisma.dish.upsert({
        where: { name: 'Efo Riro' },
        update: {},
        create: {
            name: 'Efo Riro',
            mealClass: MealClass.SOUP,
            defaultCalories: 240,
            preparationTimeMin: 35,
            ingredients: {
                create: [
                    { ingredientId: efo.id, quantity: '3 bunches' },
                    { ingredientId: tomato.id, quantity: '3' },
                    { ingredientId: pepper.id, quantity: '2' },
                    { ingredientId: beef.id, quantity: '300g', isOptional: true },
                    { ingredientId: palmOil.id, quantity: '1/3 cup' },
                ],
            },
        },
    });

    // 11. Beans (LEGUME - Standalone)
    await prisma.dish.upsert({
        where: { name: 'Beans' },
        update: {},
        create: {
            name: 'Beans',
            mealClass: MealClass.LEGUME,
            defaultCalories: 230,
            preparationTimeMin: 90,
            ingredients: {
                create: [
                    { ingredientId: beans.id, quantity: '2 cups' },
                    { ingredientId: onion.id, quantity: '1' },
                    { ingredientId: palmOil.id, quantity: '2 tbsp' },
                ],
            },
        },
    });

    // 12. Moi-Moi (LEGUME - Standalone)
    await prisma.dish.upsert({
        where: { name: 'Moi-Moi' },
        update: {},
        create: {
            name: 'Moi-Moi',
            mealClass: MealClass.LEGUME,
            defaultCalories: 200,
            preparationTimeMin: 60,
            ingredients: {
                create: [
                    { ingredientId: beans.id, quantity: '2 cups' },
                    { ingredientId: pepper.id, quantity: '2' },
                    { ingredientId: onion.id, quantity: '1' },
                    { ingredientId: eggs.id, quantity: '2', isOptional: true },
                    { ingredientId: vegetableOil.id, quantity: '3 tbsp' },
                ],
            },
        },
    });

    // 13. Akara (LEGUME - Standalone)
    await prisma.dish.upsert({
        where: { name: 'Akara' },
        update: {},
        create: {
            name: 'Akara',
            mealClass: MealClass.LEGUME,
            defaultCalories: 180,
            preparationTimeMin: 30,
            ingredients: {
                create: [
                    { ingredientId: beans.id, quantity: '2 cups' },
                    { ingredientId: onion.id, quantity: '1' },
                    { ingredientId: pepper.id, quantity: '2' },
                    { ingredientId: vegetableOil.id, quantity: '1 cup (for frying)' },
                ],
            },
        },
    });

    // 14. Pap (LIGHT - Breakfast)
    await prisma.dish.upsert({
        where: { name: 'Pap' },
        update: {},
        create: {
            name: 'Pap',
            mealClass: MealClass.LIGHT,
            defaultCalories: 120,
            preparationTimeMin: 15,
            ingredients: {
                create: [{ ingredientId: cornFlour.id, quantity: '1 cup' }],
            },
        },
    });

    // 15. Fried Plantain (SIDE)
    await prisma.dish.upsert({
        where: { name: 'Fried Plantain' },
        update: {},
        create: {
            name: 'Fried Plantain',
            mealClass: MealClass.SIDE,
            defaultCalories: 160,
            preparationTimeMin: 15,
            ingredients: {
                create: [
                    { ingredientId: plantain.id, quantity: '2 ripe' },
                    { ingredientId: vegetableOil.id, quantity: '1/4 cup' },
                ],
            },
        },
    });

    console.log('✅ 15 Essential dishes created');
    console.log('🎉 Seeding complete!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
