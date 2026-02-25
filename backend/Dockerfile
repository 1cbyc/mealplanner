FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies for Prisma
RUN apk add --no-cache openssl

# Install dependencies
RUN npm ci

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma Client
RUN npx prisma generate

# Copy source code and config
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src/

# Build the application
RUN npm run build

EXPOSE 4000

# Production: Run migrations and start (preserves data)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
