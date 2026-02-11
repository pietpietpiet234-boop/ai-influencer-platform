# Contributing to AI Influencer Platform

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow best practices

## Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/ai-influencer-platform.git
   cd ai-influencer-platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env
   # Add your API keys and database URL
   ```

4. **Set Up Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

- `feature/` - New features (e.g., `feature/talking-avatars`)
- `fix/` - Bug fixes (e.g., `fix/credit-calculation`)
- `docs/` - Documentation (e.g., `docs/api-reference`)
- `refactor/` - Code refactoring (e.g., `refactor/api-structure`)

### Commit Messages

Follow conventional commits:

```
feat: add talking avatar generation
fix: correct credit deduction logic
docs: update API documentation
refactor: simplify character creation flow
test: add unit tests for credit system
```

### Pull Request Process

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Update documentation
5. Submit PR with clear description
6. Address review comments
7. Merge after approval

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use strict mode

### React/Next.js

- Use functional components
- Implement proper error boundaries
- Follow React hooks best practices
- Use Server Components when possible

### Naming Conventions

- **Components**: PascalCase (`GenerateButton.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`CREDIT_COSTS`)
- **Types**: PascalCase with descriptive names

### File Structure

```
app/
  ├── (auth)/           # Auth-related pages
  ├── (dashboard)/      # Dashboard pages
  ├── api/              # API routes
  └── layout.tsx        # Root layout

components/
  ├── ui/               # Reusable UI components
  ├── dashboard/        # Dashboard-specific components
  └── providers/        # Context providers

lib/
  ├── ai/               # AI service integrations
  ├── utils.ts          # Utility functions
  └── constants.ts      # App constants
```

## Testing

### Unit Tests

```bash
npm run test
```

### Integration Tests

```bash
npm run test:integration
```

### E2E Tests

```bash
npm run test:e2e
```

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest'

describe('Credit System', () => {
  it('should deduct credits correctly', () => {
    // Test implementation
  })
})
```

## Adding New Features

### 1. AI Generation Feature

1. Create API route in `app/api/generate/`
2. Add AI service function in `lib/ai/`
3. Update credit costs in `lib/credits.ts`
4. Create UI component in `components/`
5. Add to dashboard navigation
6. Update documentation

Example:
```typescript
// app/api/generate/new-feature/route.ts
export async function POST(req: Request) {
  // Implementation
}
```

### 2. Database Model

1. Update `prisma/schema.prisma`
2. Run `npx prisma generate`
3. Create migration
4. Update TypeScript types
5. Add API endpoints
6. Document schema changes

### 3. UI Component

1. Create component in `components/`
2. Use existing UI components from `components/ui/`
3. Follow design system
4. Add proper TypeScript types
5. Make responsive
6. Test accessibility

## API Development

### Creating New Endpoints

```typescript
// app/api/your-endpoint/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function GET(req: Request) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Implementation
}
```

### Error Handling

```typescript
try {
  // Operation
} catch (error) {
  console.error('Operation failed:', error)
  return NextResponse.json(
    { error: 'Operation failed' },
    { status: 500 }
  )
}
```

### Input Validation

```typescript
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})

const data = schema.parse(body)
```

## Database Guidelines

### Prisma Schema

- Use descriptive field names
- Add proper indexes
- Define relationships clearly
- Use enums for fixed values
- Add comments for complex fields

### Migrations

```bash
# Create migration
npx prisma migrate dev --name add_new_feature

# Apply migration
npx prisma migrate deploy
```

## Documentation

### Code Comments

- Comment complex logic
- Explain "why" not "what"
- Keep comments up to date
- Use JSDoc for functions

```typescript
/**
 * Deducts credits from user account
 * @param userId - User ID
 * @param amount - Credits to deduct
 * @returns Success status
 */
export async function deductCredits(
  userId: string,
  amount: number
): Promise<boolean> {
  // Implementation
}
```

### README Updates

- Update features list
- Add new API endpoints
- Document environment variables
- Update deployment instructions

## Performance Guidelines

### Frontend

- Use Next.js Image component
- Implement lazy loading
- Minimize bundle size
- Cache API responses
- Use React.memo wisely

### Backend

- Optimize database queries
- Use indexes properly
- Implement caching
- Batch operations
- Use connection pooling

### AI Services

- Cache generation results
- Implement retry logic
- Handle rate limits
- Queue requests
- Monitor costs

## Security Guidelines

- Never commit API keys
- Validate all inputs
- Sanitize user data
- Use parameterized queries
- Implement rate limiting
- Follow OWASP guidelines

## Deployment

Before merging:

- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Migrations tested
- [ ] Performance tested

## Getting Help

- Open an issue for bugs
- Start a discussion for features
- Join our Discord community
- Email: dev@aiinfluencer.com

## License

By contributing, you agree that your contributions will be licensed under the project's license.
