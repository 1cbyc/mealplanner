# NaijaNourish (WifeSaver) - MVP

## Overview
**NaijaNourish** is a "Wife-First" meal planning system designed to eliminate decision fatigue by generating valid, authentic Nigerian meal plans with strict compatibility rules.

## Tech Stack
- **Backend**: NestJS (TypeScript)
- **Frontend**: Next.js 15 (App Router) + Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Language**: TypeScript (Strict Mode)

## Project Structure
```
mealplanner/
├── backend/               # NestJS API
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema with Nigerian meal logic
│   │   └── seed.ts        # 15 essential Nigerian dishes
│   ├── src/
│   │   ├── meal-planner/  # Core meal planning module
│   │   │   ├── meal-planner.controller.ts
│   │   │   ├── meal-planner.service.ts  # Compatibility matrix logic
│   │   │   └── meal-planner.module.ts
│   │   ├── prisma.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
├── frontend/              # Next.js dashboard
│   ├── app/
│   │   ├── page.tsx       # Main dashboard
│   │   └── layout.tsx
│   ├── components/ui/     # Shadcn components
│   └── lib/utils.ts
└── README.md
```

## The "Naija Compatibility Matrix"

### Rules Implemented
1. **SWALLOW** (Eba, Pounded Yam, Semo) → **REQUIRES** SOUP (Egusi, Ogbono, Efo)
2. **RICE_PLAIN** (White Rice) → **REQUIRES** SAUCE (Tomato Stew)
3. **RICE_ONEPOT** (Jollof, Fried Rice) → **STANDALONE** (Optional sides)
4. **TUBER_BOILED** (Yam) → **REQUIRES** SAUCE
5. **LEGUME** (Beans, Moi-Moi, Akara) → **STANDALONE**

### Database Schema
- **Enums**: `MealClass`, `MarketCategory`, `MealTime`
- **Models**: `Dish`, `Ingredient`, `DishIngredient`, `MenuDay`
- **Composite Meals**: MenuDay supports primary + secondary dishes for lunch/dinner

## Setup Instructions

### 1. Database Setup (Neon PostgreSQL)

1. Go to [Neon.tech](https://neon.tech) and create a free account
2. Create a new project called "naijanourish"
3. Copy the connection string (should look like: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname`)
4. Update `backend/.env`:
   ```env
   DATABASE_URL="your_neon_connection_string_here"
   PORT=4000
   ```

### 2. Backend Setup

```bash
cd backend

# Install dependencies (if not already done)
npm install

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database with 15 Nigerian dishes
npx prisma db seed

# (Optional) Open Prisma Studio to view data
npx prisma studio

# Start the backend server
npm run start:dev
```

The API will run on `http://localhost:4000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

- **POST** `/meal-planner/generate` - Generate a 7-day meal plan
- **GET** `/meal-planner/current` - Get today's meal plan
- **POST** `/meal-planner/swap/:mealTime` - Swap breakfast/lunch/dinner for today

## Features

### Phase 1 (MVP - Implemented)
- ✅ Rigid, rule-based meal generator
- ✅ 15 curated Nigerian dishes
- ✅ Strict compatibility enforcement (no "Eba + Stew" or "Jollof + Egusi")
- ✅ Weekly plan generation
- ✅ Meal swapping functionality
- ✅ Beautiful, responsive dashboard

### Phase 2 (Planned)
- ⏳ Auto-generate grocery lists based on meal plan
- ⏳ Pantry inventory tracking
- ⏳ Ingredient quantity calculations
- ⏳ Shopping list optimization by market category

## Seeded Dishes

1. **RICE_ONEPOT**: Jollof Rice, Fried Rice
2. **RICE_PLAIN**: White Rice
3. **SWALLOW**: Eba, Pounded Yam, Semo
4. **SOUP**: Egusi Soup, Ogbono Soup, Efo Riro
5. **SAUCE**: Tomato Stew
6. **LEGUME**: Beans, Moi-Moi, Akara
7. **LIGHT**: Pap
8. **SIDE**: Fried Plantain

## Development Notes

### Key Files
- `backend/src/meal-planner/meal-planner.service.ts` - Contains the compatibility matrix
- `backend/prisma/schema.prisma` - Database schema
- `frontend/app/page.tsx` - Main dashboard UI

### Design Philosophy
- **Zero Decision Fatigue**: The system never suggests invalid combinations
- **Wife-First**: Simple, beautiful UI that requires minimal interaction
- **Authentic**: Only genuine Nigerian meal pairings

## Next Steps

1. **Set up your Neon database** and update the `DATABASE_URL`
2. **Run migrations and seeding** to populate the DB
3. **Start both servers** (backend on :4000, frontend on :3000)
4. **Generate your first meal plan** and enjoy! 🎉

## License
MIT
