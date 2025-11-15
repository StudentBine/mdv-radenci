# Mladinsko društvo Vrelec Radenci - Spletna stran

Moderna spletna stran za Mladinsko društvo Vrelec Radenci, zgrajena z Next.js, PostgreSQL in Supabase.

## 🚀 Tehnologije

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Baza podatkov**: PostgreSQL z Drizzle ORM
- **Shranjevanje slik**: Supabase Storage
- **Avtentikacija**: NextAuth.js
- **Ikone**: Lucide React

## 📁 Struktura projekta

```
mdv-radenci/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (admin)/             # Admin panel routes
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── novice/
│   │   │   │   ├── dogodki/
│   │   │   │   └── galerija/
│   │   ├── api/                 # API routes
│   │   │   ├── auth/           # NextAuth endpoints
│   │   │   ├── news/           # Novice CRUD
│   │   │   ├── events/         # Dogodki CRUD
│   │   │   └── upload/         # Upload slik
│   │   ├── novice/             # Javne strani novic
│   │   ├── dogodki/            # Javne strani dogodkov
│   │   ├── galerija/           # Javna galerija
│   │   ├── o-nas/              # O društvu
│   │   ├── kontakt/            # Kontakt
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Domača stran
│   ├── components/              # React komponente
│   │   ├── layout/             # Header, Footer
│   │   ├── home/               # Komponente domače strani
│   │   ├── news/               # Komponente za novice
│   │   ├── events/             # Komponente za dogodke
│   │   └── admin/              # Admin komponente
│   └── lib/                     # Utility funkcije
│       ├── db/                 # Baza podatkov
│       │   ├── index.ts        # DB connection
│       │   └── schema.ts       # Drizzle shema
│       ├── supabase.ts         # Supabase client
│       └── utils.ts            # Helper funkcije
├── public/                      # Statične datoteke
├── drizzle/                     # DB migracije
├── .env.example                 # Primer okolijskih spremenljivk
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🗄️ Baza podatkov

### Tabele:

- **users** - Admin uporabniki
- **news** - Novice
- **events** - Dogodki
- **gallery** - Slike galerije
- **albums** - Albumi galerije
- **categories** - Kategorije

## 🛠️ Namestitev

### 1. Klonirajte repozitorij

```bash
git clone <repo-url>
cd mdv-radenci
```

### 2. Namestite odvisnosti

```bash
npm install
```

### 3. Nastavite okoljske spremenljivke

Kopirajte `.env.example` v `.env` in napolnite vrednosti:

```bash
cp .env.example .env
```

Potrebne spremenljivke:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXTAUTH_SECRET` - Generirajte z `openssl rand -base64 32`
- `NEXTAUTH_URL` - URL vaše aplikacije

### 4. Nastavite PostgreSQL bazo

```bash
# Generirajte SQL migracije
npm run db:generate

# Poženite migracije
npm run db:migrate
```

### 5. Nastavite Supabase Storage

V Supabase projektu ustvarite bucket z imenom `images` in omogočite javni dostop.

### 6. Ustvarite prvega admin uporabnika

```bash
# Najprej generirajte hash gesla
node -e "console.log(require('bcrypt').hashSync('vase-varno-geslo', 10))"

# Nato vstavite uporabnika v bazo
# Zamenjajte $HASHED_PASSWORD z generiranim hash-em
psql $DATABASE_URL -c "
INSERT INTO users (email, password, name, role) 
VALUES (
  'admin@mdv-radenci.si',
  '\$HASHED_PASSWORD',
  'Admin',
  'admin'
);"
```

**⚠️ POMEMBNO**: Uporabite močno geslo in ga hranite varno!

### 7. Poženite razvojni strežnik

```bash
npm run dev
```

Stran bo dostopna na `http://localhost:3000`

## 📝 Razvoj

### Dodajanje novic preko Admin panela

1. Prijavite se na `/admin/login`
2. Pojdite na `/admin/novice`
3. Kliknite "Nova novica"
4. Izpolnite podatke in naložite sliko
5. Objavite novico

### API Endpoints

```
# Novice
GET    /api/news          - Seznam vseh novic
POST   /api/news          - Ustvari novo novico
GET    /api/news/:id      - Pridobi novico
PUT    /api/news/:id      - Posodobi novico
DELETE /api/news/:id      - Izbriši novico

# Upload
POST   /api/upload        - Naloži sliko
```

## 🚀 Production Deploy

### Vercel (Priporočeno)

1. Povežite GitHub repo z Vercel
2. Nastavite okoljske spremenljivke
3. Deploy bo avtomatski

### Alternative

- Railway
- Render
- DigitalOcean App Platform

## 🎨 Prilagajanje

### Barve

Uredite `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Vaše barve
  },
}
```

### Logo in slike

Dodajte slike v `public/` mapo in posodobite komponente.

## 📚 Dodatne funkcionalnosti za prihodnost

- ✅ Galerija z albumi
- ✅ Dogodki s koledarjem
- ✅ Kontaktni obrazec


## 🔒 Varnost

- Gesla so hashirana z bcrypt
- NextAuth.js za avtentikacijo
- Role-based access control (RBAC)
- Supabase RLS policies
- Environment variables za občutljive podatke

**⚠️ POMEMBNO**: Preden pushate na GitHub, preberite:
- 📖 `SECURITY.md` - Varnostna navodila
- ✅ `PRE_COMMIT_CHECKLIST.md` - Checklist pred commit-om
- 🚀 `GITHUB_SETUP.md` - Navodila za GitHub setup

## 📖 Dokumentacija

- `README.md` - Glavna dokumentacija (ta datoteka)
- `DEPLOYMENT.md` - Navodila za deploy na produkcijo
- `SECURITY.md` - Varnostna navodila in best practices
- `SUPABASE_SETUP.md` - Supabase Storage nastavitev
- `SUPABASE_FIX.sql` - SQL za popravilo RLS policies
- `PRE_COMMIT_CHECKLIST.md` - Checklist pred Git commit-om
- `GITHUB_SETUP.md` - GitHub repozitorij setup

## 📄 Licenca

© 2025 Mladinsko društvo Vrelec Radenci

## 🤝 Prispevanje

Za vprašanja ali izboljšave odprite issue na GitHub repozitoriju.

---

**Izdelal**: Bine Pelcl 