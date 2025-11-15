# Supabase Storage Nastavitev

## 1. Ustvari Supabase projekt

1. Pojdi na [https://supabase.com](https://supabase.com)
2. Prijavi se ali ustvari nov račun
3. Ustvari nov projekt

## 2. Pridobi API ključe

1. V Supabase Dashboard pojdi na **Settings** > **API**
2. Kopiraj:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (POMEMBNO!)
3. Dodaj te vrednosti v `.env` datoteko

**⚠️ POMEMBNO**: Service role ključ je potreben za bypass RLS policies pri nalaganju slik na strežniku!

## 3. Ustvari Storage Bucket

1. V Supabase Dashboard pojdi na **Storage**
2. Klikni **New bucket**
3. Nastavitve:
   - **Name**: `images`
   - **Public bucket**: ✅ Označi (pomembno!)
   - **File size limit**: 5MB (opcijsko)
   - **Allowed MIME types**: `image/*` (opcijsko)

## 4. Nastavi Storage Policies (POMEMBNO!)

**Če dobiš napako "row-level security policy", moraš nastaviti policies:**

### Metoda 1: Preko SQL Editor (PRIPOROČENO)

1. V Supabase Dashboard pojdi na **SQL Editor**
2. Zaženi naslednji SQL:

```sql
-- Dovoli vsem INSERT (nalaganje)
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Dovoli vsem SELECT (branje) - javni dostop
CREATE POLICY "Allow public access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Dovoli vsem UPDATE (posodabljanje)
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'images');

-- Dovoli vsem DELETE (brisanje)
CREATE POLICY "Allow authenticated deletes"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'images');
```

### Metoda 2: Preko UI

1. Pojdi na **Storage** > klikni na bucket **images**
2. Klikni na zavihek **Policies**
3. Klikni **New policy**

#### Policy 1: Za nalaganje (INSERT)
- **Policy name**: `Allow authenticated uploads`
- **Allowed operation**: `INSERT`
- **Target roles**: `authenticated`
- **Policy definition**: `bucket_id = 'images'`
- Klikni **Review** in **Save policy**

#### Policy 2: Za branje (SELECT)
- **Policy name**: `Allow public access`
- **Allowed operation**: `SELECT`
- **Target roles**: `public`
- **Policy definition**: `bucket_id = 'images'`
- Klikni **Review** in **Save policy**

#### Policy 3: Za posodabljanje (UPDATE)
- **Policy name**: `Allow authenticated updates`
- **Allowed operation**: `UPDATE`
- **Target roles**: `authenticated`
- **USING expression**: `bucket_id = 'images'`
- Klikni **Review** in **Save policy**

#### Policy 4: Za brisanje (DELETE)
- **Policy name**: `Allow authenticated deletes`
- **Allowed operation**: `DELETE`
- **Target roles**: `authenticated`
- **USING expression**: `bucket_id = 'images'`
- Klikni **Review** in **Save policy**

## 5. Preveri delovanje

1. V admin panelu dodaj novo novico
2. Klikni na polje "Naslovna slika"
3. Izberi sliko s svojega računalnika
4. Slika se bo naložila na Supabase in prikazala predogled
5. URL slike bo videti kot: `https://your-project.supabase.co/storage/v1/object/public/images/filename.jpg`

## Možne težave

### ❌ Error: "new row violates row-level security policy" (403)
**Vzrok**: Manjka service role ključ ali policies niso pravilno nastavljeni

**Rešitev 1 (PRIPOROČENO)**: Dodaj service role ključ
1. Pojdi na Supabase Dashboard > Settings > API
2. Kopiraj **service_role key** (secret, ne anon!)
3. Dodaj v `.env`: `SUPABASE_SERVICE_ROLE_KEY="tvoj-service-role-key"`
4. Restart Next.js dev server (`npm run dev`)
5. Service role key bypass-a RLS policies

**Rešitev 2**: Nastavi policies na `public` vlogo
1. Pojdi v **SQL Editor**
2. Zaženi posodobljeni SQL iz `SUPABASE_FIX.sql`
3. Ta pristop dovoli vsem nalaganje (manj varno)

**Rešitev 3**: Preveri če je bucket res public
1. Storage > images > Settings
2. Prepričaj se da je "Public bucket" vklopljen (ON)

### ❌ Slike se ne nalagajo
- Preveri ali si pravilno nastavil API ključe v `.env`
- Preveri ali je bucket `images` označen kot **Public**
- Preveri Storage Policies (korak 4)
- Preveri v Network tab (F12) kakšen error vračajo API

### ❌ Slike se ne prikazujejo
- Preveri ali ima bucket policy za javni dostop (SELECT za `public`)
- Poskusi odpreti URL slike direktno v brskalniku
- Preveri CORS nastavitve v Supabase (Settings > API)

### ❌ Error 401 Unauthorized
- Preveri `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart Next.js dev server (`npm run dev`)
- Preveri ali nisi po naključju uporabil `SUPABASE_SERVICE_ROLE_KEY` namesto anon key

## Alternativa: Ročen vnos URL-ja

Če ne želiš nalagati slik na Supabase, lahko še vedno ročno vneses URL zunanje slike (npr. iz Imgur, Cloudinary, itd.)
