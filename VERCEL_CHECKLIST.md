# Vercel Deployment Checklist

Use this checklist before deploying to Vercel.

## Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] `.env` is in `.gitignore` (should already be there)
- [ ] No secrets in source code (GitHub Actions will check this)
- [ ] All dependencies are in `package.json`
- [ ] Supabase project is set up with Storage bucket

## Supabase Setup

- [ ] Supabase project created at [supabase.com](https://supabase.com)
- [ ] Storage bucket `images` created
- [ ] Public access enabled for the bucket
- [ ] Copy these values from Supabase:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `DATABASE_URL` (from Database settings)

## Vercel Deployment

- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "Import Project"
- [ ] Select your GitHub repository
- [ ] Vercel auto-detects Next.js - click Continue
- [ ] Add environment variables:
  - [ ] `DATABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXTAUTH_URL` (your Vercel URL)
  - [ ] `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- [ ] Click "Deploy"

## Post-Deployment

- [ ] Wait for deployment to complete (2-5 minutes)
- [ ] Visit your site at `https://your-project.vercel.app`
- [ ] Create first admin user (see DEPLOYMENT.md)
- [ ] Test admin login at `/admin/login`
- [ ] Test image upload
- [ ] Test creating a news article
- [ ] (Optional) Add custom domain in Vercel settings

## Continuous Deployment

Vercel will automatically deploy when you:
- Push to main/master branch → Production deployment
- Push to other branches → Preview deployment
- Open a pull request → Preview deployment

## Troubleshooting

If something goes wrong:
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Check Supabase connection
- Review [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for details

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
