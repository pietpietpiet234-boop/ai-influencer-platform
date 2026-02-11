# AI Influencer Platform - Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js 14)                │
│  ┌────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │  Landing   │  │ Auth Pages   │  │   Dashboard       │   │
│  │   Page     │  │ (Sign In/Up) │  │  (Protected)      │   │
│  └────────────┘  └──────────────┘  └───────────────────┘   │
│         │               │                    │               │
│         └───────────────┴────────────────────┘               │
│                         │                                    │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Routes (Next.js)                      │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐  │
│  │   Auth   │  │ Generate │  │Characters │  │  User    │  │
│  │  /api/   │  │  /api/   │  │  /api/    │  │  /api/   │  │
│  │  auth    │  │ generate │  │characters │  │  user    │  │
│  └──────────┘  └──────────┘  └───────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
         │              │               │              │
         ▼              ▼               ▼              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Business Logic Layer                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Auth    │  │ Credit   │  │   AI     │  │Database  │  │
│  │ (NextAuth)│ │ System   │  │Services  │  │ (Prisma) │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
         │              │               │              │
         ▼              ▼               ▼              ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │PostgreSQL│  │  OpenAI  │  │Replicate │  │  Stripe  │  │
│  │          │  │   GPT-4  │  │  Models  │  │ Payments │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Layer

```
app/
├── page.tsx                    # Landing page (public)
├── layout.tsx                  # Root layout with SessionProvider
│
├── auth/
│   ├── signin/page.tsx        # Sign in page
│   └── signup/page.tsx        # Sign up page
│
└── dashboard/                  # Protected area
    ├── layout.tsx             # Dashboard layout with navigation
    ├── page.tsx               # Dashboard home
    ├── generate/page.tsx      # Generation interface
    ├── characters/page.tsx    # Character management
    ├── gallery/page.tsx       # Content gallery
    ├── community/page.tsx     # Community marketplace
    └── settings/page.tsx      # User settings
```

### API Layer

```
app/api/
├── auth/
│   ├── [...nextauth]/route.ts  # NextAuth handlers
│   └── signup/route.ts         # User registration
│
├── generate/
│   ├── image/route.ts          # Image generation
│   └── video/route.ts          # Video generation
│
├── characters/route.ts         # Character CRUD
├── templates/route.ts          # Template CRUD
├── generations/[id]/route.ts   # Generation status
└── user/credits/route.ts       # Credit balance
```

## Data Flow

### Image Generation Flow

```
User Input (Prompt)
      │
      ▼
Dashboard UI
      │
      ▼
POST /api/generate/image
      │
      ├─► Check Credits (lib/credits.ts)
      │       │
      │       ▼
      │   Sufficient? ──No──> Return Error
      │       │
      │      Yes
      │       ▼
      ├─► Enhance Prompt (OpenAI GPT-4)
      │       │
      │       ▼
      ├─► Create Generation Record (Prisma)
      │       │
      │       ▼
      ├─► Deduct Credits
      │       │
      │       ▼
      ├─► Call Replicate API
      │       │
      │       ▼
      ├─► Process Async (Background)
      │       │
      │       ├─► Generate Image (SDXL)
      │       │
      │       ├─► Apply Watermark (if free tier)
      │       │
      │       └─► Update Generation Record
      │
      ▼
Return Generation ID
      │
      ▼
Frontend Polls Status
      │
      ▼
Display Result
```

### Authentication Flow

```
User Login
      │
      ▼
POST /api/auth/signin (NextAuth)
      │
      ├─► Credentials Provider
      │       │
      │       ├─► Validate Email/Password
      │       │       │
      │       │       ▼
      │       │   Check Database (Prisma)
      │       │       │
      │       │       ▼
      │       │   Compare Hash (bcrypt)
      │       │
      │       └─► Return User or Error
      │
      ├─► Google Provider
      │       │
      │       └─► OAuth Flow
      │
      ▼
Generate JWT Token
      │
      ▼
Create Session
      │
      ▼
Set Cookie
      │
      ▼
Redirect to Dashboard
```

### Credit System Flow

```
User Action (Generate)
      │
      ▼
Check Daily Reset Needed
      │
      ├─► Last Reset > 24h? ──Yes──> Reset Credits
      │       │                           │
      │       No                          ▼
      │       │                    Add Daily Credits
      │       │                           │
      │       └───────────────────────────┘
      │
      ▼
Check Credit Balance
      │
      ├─► Sufficient? ──No──> Return Error
      │       │
      │      Yes
      │       ▼
      ├─► Deduct Credits
      │       │
      │       ▼
      ├─► Create Transaction Record
      │       │
      │       ▼
      └─► Process Generation
```

## Database Schema

```
┌──────────────┐         ┌──────────────┐
│     User     │◄────────┤   Account    │
│              │         │  (OAuth)     │
├──────────────┤         └──────────────┘
│ id           │
│ email        │◄───┐
│ name         │    │
│ password     │    │
│ role         │    │    ┌──────────────┐
│ credits      │    └────┤  Character   │
└──────────────┘         │              │
       │                 ├──────────────┤
       │                 │ name         │
       │                 │ gender       │
       │                 │ age          │
       │                 │ style        │
       │                 │ faceEmbedding│
       │                 └──────────────┘
       │                        │
       │                        │
       │                        ▼
       │                 ┌──────────────┐
       └─────────────────┤ Generation   │
                         │              │
                         ├──────────────┤
                         │ type         │
                         │ prompt       │
                         │ status       │
                         │ imageUrl     │
                         │ videoUrl     │
                         │ creditsUsed  │
                         └──────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Forms**: React Hook Form (implicit)
- **Validation**: Zod

### Backend
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js
- **Database ORM**: Prisma
- **Validation**: Zod
- **Password Hashing**: bcryptjs

### Database
- **Primary**: PostgreSQL
- **ORM**: Prisma
- **Migrations**: Prisma Migrate
- **Caching**: Redis (Upstash) - Ready

### AI Services
- **Image Generation**: Replicate (SDXL)
- **Consistent Characters**: PhotoMaker
- **Video Generation**: Stable Video Diffusion
- **Talking Avatars**: SadTalker
- **Prompt Enhancement**: OpenAI GPT-4
- **Text-to-Speech**: OpenAI TTS

### Infrastructure
- **Hosting**: Vercel (recommended)
- **Database**: Supabase/Neon/Railway
- **Storage**: AWS S3 / Cloudflare R2
- **Monitoring**: Sentry (ready)
- **Analytics**: Vercel Analytics

## Security Architecture

### Authentication
```
Client Request
      │
      ▼
Middleware (middleware.ts)
      │
      ├─► Check Route
      │       │
      │       ├─► Public Route? ──Yes──> Allow
      │       │       │
      │       │       No
      │       │       ▼
      │       └─► Check JWT Token
      │               │
      │               ├─► Valid? ──Yes──> Allow
      │               │       │
      │               │       No
      │               │       ▼
      │               └─► Redirect to Sign In
      │
      ▼
API Route Handler
      │
      ├─► getServerSession()
      │       │
      │       ▼
      │   Validate Session
      │       │
      │       ├─► Invalid? ──> Return 401
      │       │
      │       ▼
      │   Check Permissions
      │       │
      │       └─► Process Request
      │
      ▼
Return Response
```

### Input Validation
```
User Input
      │
      ▼
Zod Schema Validation
      │
      ├─► Invalid? ──> Return 400 Error
      │       │
      │      Valid
      │       ▼
      ├─► Sanitize Input
      │       │
      │       ▼
      ├─► Check Authorization
      │       │
      │       ▼
      └─► Process with Prisma (SQL Injection Safe)
```

## Scalability Considerations

### Horizontal Scaling
- Stateless API routes
- JWT-based sessions
- Database connection pooling
- Redis for session storage
- CDN for static assets

### Vertical Scaling
- Database indexes
- Query optimization
- Background job processing
- Caching strategies

### Load Distribution
```
┌─────────┐
│  Users  │
└────┬────┘
     │
     ▼
┌────────────┐
│ Load       │
│ Balancer   │
└────┬───────┘
     │
     ├───────────┬───────────┐
     ▼           ▼           ▼
┌────────┐  ┌────────┐  ┌────────┐
│ Server │  │ Server │  │ Server │
│   1    │  │   2    │  │   3    │
└────┬───┘  └────┬───┘  └────┬───┘
     │           │           │
     └───────────┴───────────┘
                 │
                 ▼
        ┌───────────────┐
        │   Database    │
        │   (Primary)   │
        └───────┬───────┘
                │
                ├─────────┐
                ▼         ▼
        ┌──────────┐ ┌──────────┐
        │  Read    │ │  Read    │
        │ Replica  │ │ Replica  │
        └──────────┘ └──────────┘
```

## Performance Optimizations

### Frontend
- Server Components by default
- Client Components only when needed
- Image optimization (next/image)
- Code splitting
- Lazy loading

### Backend
- Database query optimization
- Index utilization
- Connection pooling
- Caching with Redis
- Background job processing

### AI Services
- Request queuing
- Result caching
- Parallel processing
- Cost optimization

## Monitoring & Observability

### Metrics to Track
- API response times
- Error rates
- Credit consumption
- Generation success rate
- User engagement
- Database performance

### Logging Strategy
```
Application Logs
      │
      ├─► Console (Development)
      │
      ├─► Sentry (Production Errors)
      │
      ├─► Vercel Logs (Deployment)
      │
      └─► Custom Analytics (User Actions)
```

## Deployment Architecture

### Production Setup
```
┌─────────────────────────────────────────┐
│           Vercel (Frontend/API)         │
│  ┌────────────────────────────────────┐ │
│  │     Next.js Application            │ │
│  │  - Static Pages                    │ │
│  │  - Server Components               │ │
│  │  - API Routes                      │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
              │         │         │
              ▼         ▼         ▼
    ┌─────────────┐ ┌──────────┐ ┌──────────┐
    │ PostgreSQL  │ │  OpenAI  │ │Replicate │
    │  (Supabase) │ │          │ │          │
    └─────────────┘ └──────────┘ └──────────┘
```

## Future Architecture Enhancements

1. **Microservices**: Separate generation service
2. **Message Queue**: Redis Bull for async jobs
3. **Caching Layer**: Redis for frequent queries
4. **CDN**: CloudFlare for global distribution
5. **Websockets**: Real-time generation updates
6. **API Gateway**: Rate limiting and throttling
7. **Analytics Pipeline**: User behavior tracking
8. **ML Pipeline**: Custom model fine-tuning

## Conclusion

This architecture is designed for:
- ✅ Scalability
- ✅ Maintainability
- ✅ Security
- ✅ Performance
- ✅ Developer Experience
- ✅ Production Readiness
