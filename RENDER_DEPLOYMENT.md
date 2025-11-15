# Deployment na Render.com

Ta dokument opisuje, kako deployate MDV Radenci projekt na Render.com.

## Predpogoji

- GitHub račun
- Render.com račun (lahko se prijavite z GitHub računom)
- Supabase projekt že nastavljen

## Koraki za deployment

### 1. Priprava GitHub repozitorija

Projekt mora biti pushnan na GitHub:

```bash
# Če še niste, inicializirajte git repozitorij
git init
git add .
git commit -m "Initial commit for Render deployment"

# Povežite z GitHub repozitorijem
git remote add origin https://github.com/VAS-USERNAME/mdv-radenci.git
git branch -M main
git push -u origin main
```

### 2. Ustvarjanje PostgreSQL baze na Render

1. Pojdite na [Render Dashboard](https://dashboard.render.com/)
2. Kliknite **New +** → **PostgreSQL**
3. Nastavitve:
   - **Name**: `mdv-radenci-db`
   - **Database**: `mdv_radenci`
   - **User**: `mdv_user`
   - **Region**: Frankfurt (ali najbližja regija)
   - **Plan**: Free
4. Kliknite **Create Database**
5. Počakajte, da se baza ustvari
6. **POMEMBNO**: Kopirajte **Internal Database URL** - ta bo potreben za aplikacijo

### 3. Inicializacija baze podatkov

Po kreaciji baze morate zagnati SQL ukaze za kreacijo tabel:

1. Na Render dashboard pojdite na svojo bazo
2. Kliknite na **Connect** → **External Connection**
3. Uporabite PSQL URL za povezavo:

```bash
psql postgresql://mdv_user:PASSWORD@HOST/mdv_radenci
```

4. Zaženite SQL ukaze iz datoteke `drizzle/0000_initial_schema.sql` ali uporabite Drizzle push:

**Opcija A - Drizzle Push (priporočeno):**

Lokalno nastavite DATABASE_URL na Render bazo in zaženite:

```bash
# Nastavite DATABASE_URL na Render Internal URL
export DATABASE_URL="postgresql://mdv_user:PASSWORD@HOST/mdv_radenci"

# Zaženite Drizzle push
npm run db:push
```

**Opcija B - SQL skripta:**

Kopirajte vsebino iz `drizzle/` mape in zaženite SQL ukaze direktno v PSQL.

### 4. Kreacija admin uporabnika

Po inicializaciji baze ustvarite admin uporabnika:

```sql
-- Povežite se na bazo preko PSQL
psql "INTERNAL_DATABASE_URL"

-- Ustvarite admin uporabnika (geslo: admin123)
INSERT INTO users (id, email, name, password, role, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@mdv-radenci.si',
  'Administrator',
  '$2b$10$YourHashedPasswordHere', -- Uporabite bcrypt hash
  'admin',
  NOW(),
  NOW()
);
```

**Za generiranje bcrypt hash-a:**

```bash
# Lokalno zaženite Node.js
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('admin123', 10, (err, hash) => console.log(hash));"
```

### 5. Deployment Next.js aplikacije

#### Avtomatski deployment z render.yaml

1. Na [Render Dashboard](https://dashboard.render.com/) kliknite **New +** → **Blueprint**
2. Povežite svoj GitHub repozitorij
3. Render bo avtomatsko zaznal `render.yaml` in konfiguriral vse storitve

#### Ročni deployment

1. Kliknite **New +** → **Web Service**
2. Povežite GitHub repozitorij z MDV Radenci projektom
3. Nastavitve:
   - **Name**: `mdv-radenci`
   - **Region**: Frankfurt
   - **Branch**: `main` (ali `master`)
   - **Root Directory**: (pustite prazno)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 6. Konfiguracija environment variables

V **Environment** sekciji dodajte naslednje spremenljivke:

#### Obvezne spremenljivke:

```
# Database
DATABASE_URL=<INTERNAL_DATABASE_URL_IZ_RENDER_POSTGRES>

# Node Environment
NODE_ENV=production

# Supabase (uporabite svoje ključe)
NEXT_PUBLIC_SUPABASE_URL=https://owepynxycxmexwvwjhqo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<VAŠ_SUPABASE_ANON_KEY>
SUPABASE_SERVICE_ROLE_KEY=<VAŠ_SUPABASE_SERVICE_ROLE_KEY>

# NextAuth
NEXTAUTH_URL=https://mdv-radenci.onrender.com
NEXTAUTH_SECRET=<GENERIRAJTE_RANDOM_STRING>

# App URL
NEXT_PUBLIC_APP_URL=https://mdv-radenci.onrender.com
```

#### Generiranje NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

### 7. Deployment

1. Kliknite **Create Web Service**
2. Render bo avtomatsko začel z buildanjem in deploymentom
3. Počakajte 5-10 minut za prvi deployment
4. Aplikacija bo dostopna na: `https://mdv-radenci.onrender.com`

## Posodobitve baze podatkov

Ko spreminjate shemo baze:

### Opcija 1: Drizzle Push (priporočeno za majhne spremembe)

```bash
# Lokalno se povežite na Render bazo
export DATABASE_URL="<RENDER_INTERNAL_DATABASE_URL>"

# Zaženite push
npm run db:push
```

### Opcija 2: SQL migracije (priporočeno za produkcijo)

```bash
# Generirajte migracijsko datoteko
npm run db:generate

# Povežite se na Render bazo preko PSQL
psql "<RENDER_INTERNAL_DATABASE_URL>"

# Ročno zaženite SQL ukaze iz generirane datoteke
```

## Pomembna opozorila

### Free Tier omejitve

- **Baza**: 256 MB prostora, 1 GB prenosa/mesec
- **Web Service**: Spindown po 15 minutah neaktivnosti
- **Cold Start**: Prvi request po spindownu lahko traja 30-60 sekund

### Spindown prevencija (opcijsko)

Za preprečitev spindowna lahko nastavite periodične pinge:

1. Uporabite brezplačni servis kot je [UptimeRobot](https://uptimerobot.com/)
2. Nastavite ping na `https://mdv-radenci.onrender.com/api/health` vsakih 5-10 minut

### Varnost

- ✅ Vsi ključi so že izvzeti iz Git repozitorija (.gitignore)
- ✅ Environment variables so shranjene varno na Render
- ✅ Database URL je notranji (Internal) in ni dostopen javno
- ✅ Supabase Service Role Key je varno shranjen

### Logging in monitoring

- Render avtomatsko zbira logs - dostopni v Dashboard → Logs
- Za napredni monitoring lahko integrirate Sentry ali podobno orodje

## Troubleshooting

### Build napaka

```bash
# Preverite build logs v Render Dashboard
# Najpogostejše napake:
- Missing dependencies: Preverite package.json
- TypeScript errors: Zaženite `npm run build` lokalno
- Environment variables: Preverite, da so vse nastavljene
```

### Database connection napaka

```bash
# Preverite DATABASE_URL:
# - Mora biti Internal Database URL (ne External)
# - Format: postgresql://user:password@host:5432/database
# - Brez SSL parametrov za Render
```

### NextAuth napaka

```bash
# Preverite:
# - NEXTAUTH_URL mora biti production URL (https://...)
# - NEXTAUTH_SECRET mora biti nastavljen
# - Database mora vsebovati users tabelo
```

### Slike se ne naložijo

```bash
# Preverite Supabase nastavitve:
# - Bucket mora biti public
# - RLS policies morajo biti pravilno nastavljene
# - SUPABASE_SERVICE_ROLE_KEY mora biti pravilen
```

## Performance optimizacija

### Za produkcijsko rabo:

1. **Upgrade na plačan plan**: Za izognitev spindownu
2. **CDN**: Uporabite Cloudflare za statične assete
3. **Database**: Upgrade na večji plan za več prometa
4. **Image optimization**: Next.js že ima vgrajeno, Supabase storage je optimiziran

## Avtomatski deployment

Render avtomatsko deployira vsak push na `main` branch:

```bash
# Lokalne spremembe
git add .
git commit -m "Feature: XYZ"
git push origin main

# Render bo avtomatsko začel z novim deploymentom
```

## Dodatna pomoč

- [Render dokumentacija](https://render.com/docs)
- [Next.js deployment guide](https://nextjs.org/docs/deployment)
- [Drizzle ORM migrations](https://orm.drizzle.team/kit-docs/overview)

## Cena

**Trenutna konfiguracija (FREE tier):**
- PostgreSQL: $0/mesec
- Web Service: $0/mesec
- **Skupaj: BREZPLAČNO**

**Priporočena produkcijska konfiguracija:**
- PostgreSQL Basic: $7/mesec (1 GB RAM, 10 GB disk)
- Web Service Starter: $7/mesec (0.5 GB RAM, brez spindown)
- **Skupaj: $14/mesec**
