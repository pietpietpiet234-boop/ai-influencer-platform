# AI Influencer Platform

A comprehensive AI-powered platform for creating consistent AI influencers with advanced character generation, image-to-video conversion, talking avatars, and community features.

## Features

### 🎨 Consistent Character Generation
- Create AI influencers with customizable appearance (gender, age, ethnicity, style)
- Face-Lock technology for maintaining character consistency across generations
- Multiple art styles: Realistic, Anime, Cartoon, Artistic, Cyberpunk, Fantasy
- Detailed character customization (hair color, eye color, body type, etc.)

### 🎬 Image-to-Video Conversion
- Transform static images into dynamic videos with natural motion
- Adjustable motion intensity and frame rates
- Professional quality video output
- Seamless animation from any image

### 🗣️ Talking Avatars
- Generate realistic talking avatars with accurate lip-sync
- Text-to-speech integration with multiple voice options
- Natural facial expressions and movements
- High-quality audio synchronization

### 👥 Face Swap
- Swap faces between images with AI precision
- Maintain facial features and expressions
- Professional-grade results

### 🌐 Community Features
- Browse and use templates from the community
- Share your own character templates
- Trending styles and popular creations
- Community gallery and inspiration

### 💳 Credit System & Tiers
- **Free Tier**: 80 daily credits (with watermark)
- **Micro Influencer**: 1,000 daily credits, no watermark ($29/month)
- **Macro Influencer**: 3,000 daily credits, priority processing ($79/month)
- **Mega Influencer**: 10,000 daily credits, API access ($199/month)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **AI Services**:
  - Replicate (Image & Video Generation)
  - OpenAI (Prompt Enhancement, Character Description)
  - Stability AI (Consistent Characters)
- **Payment**: Stripe
- **Caching**: Upstash Redis

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- API keys for:
  - OpenAI
  - Replicate
  - Stability AI (optional)
  - ElevenLabs (optional)
  - Upstash Redis
  - Stripe

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-influencer-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys and database URL.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `.env.example` for a complete list of required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your app URL
- `NEXTAUTH_SECRET`: Secret for NextAuth (generate with `openssl rand -base64 32`)
- `OPENAI_API_KEY`: OpenAI API key
- `REPLICATE_API_TOKEN`: Replicate API token
- `STRIPE_SECRET_KEY`: Stripe secret key
- `UPSTASH_REDIS_REST_URL`: Upstash Redis URL

## Project Structure

```
├── app/
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── generate/      # AI generation endpoints
│   │   ├── characters/    # Character management
│   │   └── generations/   # Generation status
│   ├── auth/              # Auth pages (signin, signup)
│   ├── dashboard/         # Protected dashboard pages
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── dashboard/         # Dashboard-specific components
│   └── providers/         # Context providers
├── lib/
│   ├── ai/                # AI service integrations
│   ├── auth.ts            # NextAuth configuration
│   ├── credits.ts         # Credit system logic
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Utility functions
├── prisma/
│   └── schema.prisma      # Database schema
└── types/                 # TypeScript type definitions
```

## Features Breakdown

### Credit Costs
- Image Generation: 5 credits
- Video Generation: 20 credits
- Talking Avatar: 15 credits
- Face Swap: 10 credits

### Generation Types
- **IMAGE**: AI-generated images from text prompts
- **VIDEO**: Image-to-video conversion
- **TALKING_AVATAR**: Animated avatars with speech
- **FACE_SWAP**: Face swapping between images

### Character Styles
- Realistic
- Anime
- Cartoon
- Artistic
- Cyberpunk
- Fantasy

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out

### Generation
- `POST /api/generate/image` - Generate image
- `POST /api/generate/video` - Generate video
- `GET /api/generations/:id` - Get generation status

### Characters
- `POST /api/characters` - Create character
- `GET /api/characters` - List user's characters

## Database Schema

Key models:
- `User`: User accounts and authentication
- `Character`: AI influencer characters
- `Generation`: Generated content (images, videos)
- `Template`: Community templates
- `Subscription`: Payment subscriptions
- `CreditTransaction`: Credit usage history

## Content Moderation

The platform implements content filters to prevent NSFW content generation:
- Negative prompts automatically applied
- Content moderation checks
- User reporting system

## Transparency & Ethics

All content is clearly labeled as AI-generated:
- Free tier includes watermarks
- Transparent about AI usage
- Designed for professional use cases
- Clear terms of service

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Deployment

The platform can be deployed to:
- Vercel (recommended for Next.js)
- AWS
- Google Cloud Platform
- Any Node.js hosting provider

### Deployment Checklist
- Set up PostgreSQL database
- Configure all environment variables
- Run database migrations
- Set up Redis for caching
- Configure Stripe webhooks
- Set up file storage (S3, Cloudflare R2, etc.)

## License

This project is proprietary software. All rights reserved.

## Support

For support, email support@aiinfluencer.com or join our Discord community.

## Acknowledgments

- Powered by Replicate, OpenAI, and Stability AI
- UI components from Radix UI
- Built with Next.js and Vercel
