# MealPlanner Deployment

## Quick Start

```bash
# 1. Clone and setup
git clone https://github.com/1cbyc/mealplanner.git
cd mealplanner
git checkout claw-branch

# 2. Configure environment
cp .env.example .env
# Edit .env with your database credentials

# 3. Run
docker-compose up -d
```

## Environment (.env file)
```bash
DB_USER=your_db_user
DB_PASSWORD=your_password
DB_NAME=your_database
DATABASE_URL=postgresql://user:pass@localhost:5432/db?schema=public
BACKEND_PORT=4000
FRONTEND_PORT=3000
```

## For Development (if you need sample data)

Temporarily change the Dockerfile CMD to:
```dockerfile
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npx prisma db seed && node dist/src/main.js"]
```

Then rebuild:
```bash
docker-compose down
docker-compose build
docker-compose up -d
```

## Backup Database
```bash
docker exec mealplanner-db pg_dump -U ${DB_USER} ${DB_NAME} > backup.sql
```

## Notes
- Uses `prisma migrate deploy` (preserves data)
- Random database/user names recommended for security
- `.env` file contains secrets - never commit to Git