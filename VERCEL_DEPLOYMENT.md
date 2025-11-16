# Vercel Deployment Guide

This guide will help you deploy your Next.js application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier available)
- A Supabase database instance
- Git repository (GitHub, GitLab, or Bitbucket)

## Quick Start

### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect Next.js configuration
5. Configure environment variables (see below)
6. Click "Deploy"

### 3. Deploy via CLI (Alternative)

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Environment Variables

Add these environment variables in your Vercel project settings:

### Required Variables

```
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## Database Setup

1. Ensure your Supabase database is accessible from Vercel
2. Run database migrations if needed:
   ```bash
   npm run db:push
   ```

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel
5. Update `NEXTAUTH_URL` environment variable to match your custom domain

## Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to your main/master branch
- **Preview**: When you push to any other branch or open a pull request

## Build Configuration

The project uses standard Next.js build settings:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

These are configured in `vercel.json`.

## Troubleshooting

### Build Failures

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify environment variables are set correctly

### Database Connection Issues

1. Check if DATABASE_URL is correct
2. Ensure Supabase allows connections from Vercel IPs
3. Verify SSL mode settings if required

### Runtime Errors

1. Check function logs in Vercel dashboard
2. Verify API routes are working correctly
3. Check that all environment variables are available at runtime

## Monitoring

- View logs: Vercel Dashboard → Your Project → Logs
- Analytics: Vercel Dashboard → Your Project → Analytics
- Performance: Use Vercel Speed Insights (optional)

## Rolling Back

If a deployment fails:
1. Go to Vercel Dashboard → Deployments
2. Find a previous working deployment
3. Click "..." → "Promote to Production"

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase with Vercel](https://supabase.com/docs/guides/integrations/vercel)
