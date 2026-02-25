# MealPlanner Deployment Guide

## Development vs Production

### Development (Local/MacBook)
```bash
# Use the default Dockerfile (with db push --accept-data-loss)
docker-compose up

# Or with local override if port 5432 is taken
docker-compose -f docker-compose.yml -f docker-compose-local.yml up
```

### Production (VPS/Server)
```bash
# 1. Build with production Dockerfile
docker build -f backend/Dockerfile.production -t mealplanner-backend:prod ./backend

# 2. Run with production compose
docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d

# 3. Or build and run together
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d
```

## Key Differences

### Development Dockerfile (`backend/Dockerfile`)
- Uses `db push --accept-data-loss` (resets data on restart)
- Includes `db seed` (adds sample data)
- Good for local development/testing

### Production Dockerfile (`backend/Dockerfile.production`)
- Uses `migrate deploy` (preserves data)
- Multi-stage build (smaller image)
- Non-root user for security
- Health checks
- No data loss on restart

## Environment Variables

Create `.env` file with:
```bash
# Database Configuration
DB_USER=your_random_db_user_here
DB_PASSWORD=your_secure_password_here
DB_NAME=your_random_db_name_here

# Application
BACKEND_PORT=4000
FRONTEND_PORT=3000
NODE_ENV=production  # or development
```

## Security Notes

1. **Never commit `.env` to Git**
2. **Use random database/user names** (not descriptive)
3. **Change default ports** if needed
4. **Use SSL/TLS** in production
5. **Regular backups** of PostgreSQL data

## Backup & Restore

```bash
# Backup database
docker exec mealplanner-db pg_dump -U ${DB_USER} ${DB_NAME} > backup.sql

# Restore database
cat backup.sql | docker exec -i mealplanner-db psql -U ${DB_USER} ${DB_NAME}
```

## Monitoring

```bash
# Check logs
docker-compose logs -f

# Check health
docker-compose ps

# View resource usage
docker stats
```

## Troubleshooting

### Port 5432 already in use (MacBook)
```bash
# Use local override
docker-compose -f docker-compose.yml -f docker-compose-local.yml up
```

### Database connection errors
1. Check `.env` file has correct credentials
2. Verify PostgreSQL is running: `docker-compose ps`
3. Check logs: `docker-compose logs postgres`

### Build errors
```bash
# Clean rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```