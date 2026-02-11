# How to Run the AI Influencer Platform

## Quick Start (Simple - No Docker)

The app is already configured to use SQLite, so you don't need Docker or PostgreSQL installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database
```bash
npx prisma generate
npx prisma db push
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open Your Browser
Navigate to: **http://localhost:3000**

---

## Using Docker (PostgreSQL + Redis)

If you want to use PostgreSQL instead of SQLite:

### 1. Update .env file
```bash
# Change this line in .env:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_influencer"
```

### 2. Start Services
```bash
docker compose up -d
```

### 3. Set Up Database
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```

---

## Available Commands

### Development
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Database
- `npx prisma studio` - Open database GUI browser
- `npx prisma generate` - Generate Prisma Client
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create and apply migrations
- `npm run db:seed` - Seed database with sample data

### Docker
- `docker compose up -d` - Start PostgreSQL and Redis
- `docker compose down` - Stop all services
- `docker compose logs -f` - View logs

---

## Environment Setup

The app needs certain environment variables. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### Required Variables
- `DATABASE_URL` - Database connection (SQLite or PostgreSQL)
- `NEXTAUTH_URL` - App URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Secret key for auth

### Optional Variables (for full features)
- `OPENAI_API_KEY` - For AI prompt enhancement
- `REPLICATE_API_TOKEN` - For image/video generation
- `STRIPE_SECRET_KEY` - For payments
- `UPSTASH_REDIS_REST_URL` - For caching
- `UPSTASH_REDIS_REST_TOKEN` - For caching

---

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or run on a different port
PORT=3001 npm run dev
```

### Database Connection Issues
```bash
# Reset the database
rm -f prisma/dev.db
npx prisma db push
```

### Prisma Client Out of Sync
```bash
npx prisma generate
```

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

---

## Testing the App

Once running, you can:

1. **Visit Homepage** - http://localhost:3000
2. **Sign Up** - Create a test account via the signup flow
3. **API Test** - Check http://localhost:3000/api/auth/signup (POST endpoint)

---

## What's Running

When you run `npm run dev`:
- **Next.js Dev Server** on port 3000
- **Hot Module Replacement** (auto-refresh on code changes)
- **API Routes** available at `/api/*`
- **SQLite Database** at `prisma/dev.db`

When you run Docker:
- **PostgreSQL** on port 5432
- **Redis** on port 6379

---

## Next Steps

- Read [QUICKSTART.md](./QUICKSTART.md) for feature overview
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Read [FEATURES.md](./FEATURES.md) for complete feature list
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

---

## Stop the Server

Press `Ctrl+C` in the terminal where the server is running.
