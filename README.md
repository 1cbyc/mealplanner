# MealPlanner (WifeSaver)

A meal planning application for Nigerian cuisine with strict compatibility rules.

## Tech Stack

- Backend: NestJS (TypeScript)
- Frontend: Next.js 15 (App Router) + Tailwind CSS + Shadcn UI
- Database: PostgreSQL
- ORM: Prisma

## Project Structure

```
mealplanner/
├── backend/               # NestJS API
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── src/
│       ├── meal-planner/
│       ├── prisma.service.ts
│       └── main.ts
└── frontend/              # Next.js dashboard
    ├── app/
    └── components/
```

## Nigerian Meal Compatibility Rules

The system enforces authentic Nigerian meal pairings:

1. SWALLOW (Eba, Pounded Yam, Semo) must be paired with SOUP (Egusi, Ogbono, Efo)
2. RICE_PLAIN (White Rice) must be paired with SAUCE (Tomato Stew)
3. RICE_ONEPOT (Jollof, Fried Rice) is standalone
4. TUBER_BOILED (Yam) must be paired with SAUCE
5. LEGUME (Beans, Moi-Moi, Akara) is standalone

## Database Setup

### Using Docker (Local)

```bash
docker compose up -d
```

### Using Railway (Production)

1. Create a PostgreSQL database on Railway
2. Copy the DATABASE_URL
3. Update `backend/.env`

## Running Locally

```bash
# Backend
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed
npm run start:dev

# Frontend (new terminal)
cd frontend
npm run dev
```

Backend: http://localhost:4000
Frontend: http://localhost:3000

## Local Development

### With Docker
```bash
# Start PostgreSQL
docker compose up -d postgres

# Then run backend manually (see below)
```

### Backend Setup
```bash
cd backend
npm install

# NestJS will auto-load .env file
# DATABASE_URL is already configured for local PostgreSQL
npm run start:dev
```

Backend: http://localhost:4000

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:3000

## API Endpoints

- `POST /meal-planner/generate` - Generate 7-day meal plan
- `GET /meal-planner/current` - Get today's meal plan
- `POST /meal-planner/swap/:mealTime` - Swap breakfast/lunch/dinner

## Deployment

### Backend (Railway)
1. Create PostgreSQL database on Railway
2. Create new service from GitHub repo
3. Point to `/backend` as root directory
4. Railway will auto-detect Node.js and use:
   - Build: `npm install && npx prisma generate && npm run build`
   - Start: `npx prisma db push && npx prisma db seed && npm run start:prod`
5. Environment variable `DATABASE_URL` will be auto-injected by Railway PostgreSQL service

### Frontend (Vercel)
1. Import GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = your Railway backend URL (e.g., `https://mealplanner-production.up.railway.app`)
4. Vercel will auto-detect Next.js and deploy

## License

MIT
