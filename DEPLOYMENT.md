# Deployment Guide

This guide covers deploying the AI Influencer Platform to production.

## Prerequisites

Before deploying, ensure you have:

1. **PostgreSQL Database**
   - Recommended: Supabase, Neon, or Railway
   - At least 1GB storage
   - Automatic backups enabled

2. **API Keys**
   - OpenAI API key with GPT-4 access
   - Replicate API token
   - Stripe account (live keys)
   - Upstash Redis account

3. **Domain & SSL**
   - Custom domain (optional)
   - SSL certificate (automatic with Vercel)

## Deployment Platforms

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Deploy
   vercel
   ```

2. **Configure Environment Variables**
   Go to Vercel Dashboard → Settings → Environment Variables and add:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `OPENAI_API_KEY`
   - `REPLICATE_API_TOKEN`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

3. **Deploy Database Migrations**
   ```bash
   # From local machine with production DATABASE_URL
   npx prisma db push
   ```

4. **Configure Domains**
   - Add custom domain in Vercel Dashboard
   - Update `NEXTAUTH_URL` to match your domain

### Option 2: AWS (Docker)

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base
   
   FROM base AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npx prisma generate
   RUN npm run build
   
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Push to ECR**
   ```bash
   docker build -t ai-influencer .
   aws ecr get-login-password | docker login --username AWS
   docker tag ai-influencer:latest [ECR_URL]
   docker push [ECR_URL]
   ```

3. **Deploy to ECS/EKS**
   - Create task definition
   - Configure environment variables
   - Set up load balancer
   - Configure auto-scaling

### Option 3: Railway

1. **Connect Repository**
   - Go to Railway.app
   - New Project → Deploy from GitHub
   - Select your repository

2. **Add PostgreSQL**
   - Add PostgreSQL plugin
   - Copy `DATABASE_URL` to environment variables

3. **Configure Environment**
   - Add all required environment variables
   - Deploy

## Database Setup

### Initial Migration

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Optional: Seed initial data
npx prisma db seed
```

### Backup Strategy

1. **Automated Backups**
   - Enable daily backups on your database provider
   - Keep at least 7 days of backups

2. **Manual Backup**
   ```bash
   pg_dump $DATABASE_URL > backup.sql
   ```

## Stripe Setup

1. **Create Products**
   ```bash
   # Create subscription products in Stripe Dashboard
   # - Micro Influencer ($29/month)
   # - Macro Influencer ($79/month)
   # - Mega Influencer ($199/month)
   ```

2. **Configure Webhooks**
   - Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

3. **Update Environment Variables**
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Storage Configuration

### Option 1: AWS S3

```bash
# Create S3 bucket
aws s3 mb s3://ai-influencer-content

# Set CORS policy
aws s3api put-bucket-cors --bucket ai-influencer-content --cors-configuration file://cors.json
```

### Option 2: Cloudflare R2

1. Create R2 bucket in Cloudflare Dashboard
2. Generate API credentials
3. Update environment variables

## Monitoring & Logging

### Recommended Tools

1. **Error Tracking**: Sentry
   ```bash
   npm install @sentry/nextjs
   ```

2. **Analytics**: Vercel Analytics or Google Analytics

3. **Uptime Monitoring**: UptimeRobot or Pingdom

4. **Performance**: New Relic or Datadog

### Setup Sentry

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set secure NEXTAUTH_SECRET
- [ ] Use environment variables for all secrets
- [ ] Enable CORS properly
- [ ] Set up rate limiting
- [ ] Configure CSP headers
- [ ] Enable database encryption
- [ ] Regular security updates
- [ ] API key rotation policy

## Performance Optimization

1. **Caching Strategy**
   - Use Redis for session storage
   - Cache AI generation results
   - Implement CDN for static assets

2. **Database Optimization**
   - Add proper indexes
   - Enable connection pooling
   - Use read replicas for analytics

3. **AI API Optimization**
   - Implement request queuing
   - Batch similar requests
   - Cache frequent generations

## Scaling Considerations

### Horizontal Scaling

- Use managed Kubernetes (EKS, GKE)
- Implement load balancing
- Session management with Redis
- Separate API and frontend servers

### Vertical Scaling

- Upgrade server instances
- Increase database resources
- Add more Redis memory

### Cost Optimization

1. **AI API Costs**
   - Monitor usage per endpoint
   - Implement aggressive caching
   - Use cheaper models for non-critical features

2. **Database Costs**
   - Archive old generations
   - Optimize queries
   - Use read replicas

3. **Storage Costs**
   - Compress images/videos
   - Implement cleanup policies
   - Use S3 lifecycle policies

## Post-Deployment

1. **Test Critical Paths**
   - User registration
   - Image generation
   - Video generation
   - Payment flow

2. **Monitor Performance**
   - Response times
   - Error rates
   - API usage
   - Database connections

3. **Set Up Alerts**
   - High error rate
   - Slow response times
   - Low credit balance
   - Failed payments

## Rollback Plan

1. **Vercel**
   ```bash
   # Rollback to previous deployment
   vercel rollback
   ```

2. **Database**
   ```bash
   # Restore from backup
   psql $DATABASE_URL < backup.sql
   ```

3. **Application**
   - Keep previous version tagged
   - Test rollback procedure
   - Document rollback steps

## Maintenance

### Regular Tasks

- **Daily**: Monitor error logs
- **Weekly**: Check API usage and costs
- **Monthly**: Review and optimize database
- **Quarterly**: Security audit and updates

### Update Strategy

1. Test in staging environment
2. Create database backup
3. Deploy during low-traffic hours
4. Monitor for 24 hours
5. Communicate with users

## Support

For deployment issues:
- Check logs in Vercel/AWS Dashboard
- Review error tracking (Sentry)
- Contact support@aiinfluencer.com
