# Navodila za deployment

## Supabase nastavitve

### 1. Ustvari Supabase projekt

1. Pojdi na [supabase.com](https://supabase.com)
2. Ustvari nov projekt
3. Kopiraj URL in anon key

### 2. Ustvari Storage Bucket

```sql
-- V Supabase SQL Editor
-- Ustvari bucket za slike
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- Omogoči javni dostop
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Omogoči upload za avtenticirane uporabnike
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

## PostgreSQL nastavitve

### 1. Lokalno (Development)

```bash
# Ustvari bazo
createdb mdv_radenci

# Poveži se
psql mdv_radenci

# Ali uporabi Docker
docker run --name mdv-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mdv_radenci -p 5432:5432 -d postgres:15
```

### 2. Production (Railway/Supabase/Render)

Uporabite ponudnika PostgreSQL in kopirajte connection string v `.env`

## Namestitev na Vercel

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
