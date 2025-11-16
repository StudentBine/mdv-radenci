# Deployment Guide# Navodila za deployment



This project is optimized for deployment on **Vercel**. For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).## Supabase nastavitve



## Quick Deploy to Vercel### 1. Ustvari Supabase projekt



1. Push your code to GitHub1. Pojdi na [supabase.com](https://supabase.com)

2. Go to [vercel.com](https://vercel.com) and import your repository2. Ustvari nov projekt

3. Add environment variables (see below)3. Kopiraj URL in anon key

4. Deploy!

### 2. Ustvari Storage Bucket

## Required Environment Variables

```sql

```bash-- V Supabase SQL Editor

DATABASE_URL=postgresql://...-- Ustvari bucket za slike

NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.coINSERT INTO storage.buckets (id, name, public)

NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-keyVALUES ('images', 'images', true);

SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXTAUTH_URL=https://your-domain.vercel.app-- Omogoči javni dostop

NEXTAUTH_SECRET=your-secret-keyCREATE POLICY "Public Access"

```ON storage.objects FOR SELECT

USING (bucket_id = 'images');

Generate `NEXTAUTH_SECRET`:

```bash-- Omogoči upload za avtenticirane uporabnike

openssl rand -base64 32CREATE POLICY "Authenticated Upload"

```ON storage.objects FOR INSERT

WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

## Database Setup```



This project uses PostgreSQL with Supabase. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup instructions.## PostgreSQL nastavitve



## First Admin User### 1. Lokalno (Development)



```bash```bash

# Generate password hash# Ustvari bazo

node -e "console.log(require('bcrypt').hashSync('your-password', 10))"createdb mdv_radenci



# Add to database# Poveži se

psql $DATABASE_URL -c "INSERT INTO users (email, password, name, role) VALUES ('admin@mdv-radenci.si', '\$HASHED_PASSWORD', 'Admin', 'admin');"psql mdv_radenci

```

# Ali uporabi Docker

## Post-Deploymentdocker run --name mdv-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mdv_radenci -p 5432:5432 -d postgres:15

```

1. Verify site is live

2. Login at `/admin/login`### 2. Production (Railway/Supabase/Render)

3. Test image uploads

4. Configure custom domain (optional)Uporabite ponudnika PostgreSQL in kopirajte connection string v `.env`



For complete deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).## Namestitev na Vercel


### 1. Poveži GitHub repo

```bash
# Commitaj kodo
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy na Vercel

1. Pojdi na [vercel.com](https://vercel.com)
2. Import GitHub repozitorija
3. Dodaj environment variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`

### 3. Zaženi migracije

```bash
# Lokalno
npm run db:migrate

# Ali uporabi Vercel CLI
vercel env pull .env.local
npm run db:migrate
```

## Ustvari prvega admin uporabnika

```bash
# Hash gesla
node -e "console.log(require('bcrypt').hashSync('tvoje-geslo', 10))"

# Dodaj v bazo
psql $DATABASE_URL -c "INSERT INTO users (email, password, name, role) VALUES ('admin@mdv-radenci.si', 'HASHED_PASSWORD', 'Admin', 'admin');"
```

## Preverjanje

1. Obiščite vašo stran
2. Poskusite se prijaviti na `/admin/login`
3. Preverite upload slik

## SSL in domena

### 1. Domena

V Vercel projektu dodaj custom domain:
- Pojdi na Settings > Domains
- Dodaj vašo domeno (npr. mdv-radenci.si)
- Sledi navodilom za DNS nastavitve

### 2. SSL

Vercel avtomatsko nastavi SSL certifikat (Let's Encrypt)

## Monitoring

- Vercel Dashboard: Preveri logs in analytics
- Supabase Dashboard: Preveri storage uporabo
- PostgreSQL: Preveri database usage

## Backup

### Database Backup

```bash
# Izvozi bazo
pg_dump $DATABASE_URL > backup.sql

# Uvozi bazo
psql $DATABASE_URL < backup.sql
```

### Supabase Storage Backup

Uporabi Supabase CLI ali skripto za download vseh slik.
