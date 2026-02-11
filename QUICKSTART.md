# Quick Start Guide

Get your AI Influencer Platform up and running in minutes.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or use Docker)
- OpenAI API key
- Replicate API token

## Option 1: Quick Start with Docker

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd ai-influencer-platform
   npm install
   ```

2. **Start Database**
   ```bash
   docker-compose up -d
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set minimum required variables:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_influencer"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here"
   OPENAI_API_KEY="sk-..."
   REPLICATE_API_TOKEN="r8_..."
   ```

4. **Setup Database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Option 2: Manual Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup PostgreSQL

Either install PostgreSQL locally or use a cloud provider:
- **Local**: [PostgreSQL Downloads](https://www.postgresql.org/download/)
- **Cloud**: Supabase, Neon, Railway, or ElephantSQL

### 3. Configure Environment Variables

Copy the example file:
```bash
cp .env.example .env
```

Update `.env` with your credentials:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_influencer"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# AI Services
OPENAI_API_KEY="sk-..."
REPLICATE_API_TOKEN="r8_..."

# Optional for full features
STRIPE_SECRET_KEY="sk_test_..."
UPSTASH_REDIS_REST_URL="https://..."
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database schema
npx prisma db push

# Seed with demo data (optional)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

### 6. Access the Application

Open your browser to [http://localhost:3000](http://localhost:3000)

## First Steps

### 1. Create Account

- Click "Get Started" or "Sign Up"
- Enter your name, email, and password
- You'll start with 80 free daily credits

### 2. Create Your First Character

- Go to Dashboard → Characters
- Click "Create Character"
- Fill in character details:
  - Name: e.g., "Alex Rivera"
  - Gender, age, style
  - Physical attributes
- Click "Create Character"

### 3. Generate Your First Image

- Go to Dashboard → Generate
- Select "Image" tab
- Enter a prompt: e.g., "professional headshot, studio lighting"
- Select style and size
- Click "Generate Image (5 credits)"
- Wait for processing (30-60 seconds)

### 4. Explore More Features

- **Image to Video**: Transform images into videos
- **Talking Avatar**: Create speaking characters
- **Community**: Browse templates
- **Gallery**: View your creations

## Getting API Keys

### OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to API Keys section
4. Create new secret key
5. Copy and add to `.env`

### Replicate API Token

1. Go to [replicate.com](https://replicate.com)
2. Sign up or log in
3. Go to Account Settings → API Tokens
4. Copy your token
5. Add to `.env`

### Stripe (Optional - For Payments)

1. Go to [stripe.com](https://stripe.com)
2. Create account
3. Get test keys from Dashboard
4. Add to `.env`

## Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL is running
docker ps

# Or for local install
sudo service postgresql status

# Verify DATABASE_URL is correct
echo $DATABASE_URL
```

### Port Already in Use

```bash
# Use different port
PORT=3001 npm run dev
```

### Prisma Client Errors

```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (WARNING: deletes data)
npx prisma db push --force-reset
```

### API Key Issues

- Verify API keys are correct
- Check API key has sufficient credits
- Ensure no extra spaces in `.env`

## Development Commands

```bash
# Start dev server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start

# Database commands
npx prisma studio          # Open database GUI
npx prisma db push         # Sync schema to database
npx prisma generate        # Generate Prisma Client
npm run db:seed            # Seed database
```

## Project Structure

```
ai-influencer-platform/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Dashboard pages
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # UI components
│   └── dashboard/        # Dashboard components
├── lib/                   # Utilities
│   ├── ai/               # AI integrations
│   └── credits.ts        # Credit system
├── prisma/               # Database
│   ├── schema.prisma     # Schema definition
│   └── seed.ts           # Seed data
└── types/                # TypeScript types
```

## Default Login

If you ran the seed script, you can use:
- **Email**: demo@aiinfluencer.com
- **Password**: demo123456

## Next Steps

1. Read the [README.md](./README.md) for full documentation
2. Check [FEATURES.md](./FEATURES.md) for complete feature list
3. See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
4. Read [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

## Need Help?

- Open an issue on GitHub
- Check documentation in `docs/` folder
- Email: support@aiinfluencer.com
- Join our Discord community

## API Limits & Costs

### Free Tier
- 80 credits per day
- Resets every 24 hours
- Watermarked outputs

### Credit Costs
- Image: 5 credits
- Video: 20 credits
- Avatar: 15 credits
- Face Swap: 10 credits

### AI API Costs
Monitor your usage at:
- OpenAI: [platform.openai.com/usage](https://platform.openai.com/usage)
- Replicate: [replicate.com/account/billing](https://replicate.com/account/billing)

## Security Notes

⚠️ **Never commit `.env` file to git**
⚠️ **Keep API keys secure**
⚠️ **Use strong NEXTAUTH_SECRET in production**
⚠️ **Enable database encryption for production**

## Success! 🎉

You're now ready to create amazing AI-generated content!
