-- HITRI POPRAVEK za Supabase Storage RLS Policies
-- 
-- Če dobiš napako: "new row violates row-level security policy"
-- Zaženi ta SQL v Supabase Dashboard > SQL Editor

-- NAJPREJ: Preveri ali bucket 'images' obstaja in je public
-- Storage > Buckets > images > Settings > Public bucket: ON

-- IZBRIŠI STARE POLICIES ČE OBSTAJAJO (opcijsko)
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;

-- 1. Dovoli VSEM nalaganje slik (tudi z anon ključem)
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'images');

-- 2. Dovoli vsem javni dostop do slik (branje)
CREATE POLICY "Allow public access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- 3. Dovoli vsem posodabljanje
CREATE POLICY "Allow public updates"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'images');

-- 4. Dovoli vsem brisanje
CREATE POLICY "Allow public deletes"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'images');

-- PREVERI ČE JE DELOVALO:
-- Po zagonu SQL-ja pojdi v Storage > images > Policies
-- Videti bi moral 4 nove policies z "public" vlogo
