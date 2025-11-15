# 🚀 Hitra navodila za Render Deployment

## 5-minutni deployment

### 1️⃣ Push na GitHub

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2️⃣ Ustvarite Render račun

Pojdite na [render.com](https://render.com) in se prijavite z GitHub računom.

### 3️⃣ Deploy z Blueprint

1. Na [Render Dashboard](https://dashboard.render.com/) kliknite **New +**
2. Izberite **Blueprint**
3. Povežite svoj GitHub repozitorij `mdv-radenci`
4. Render bo našel `render.yaml` in pokazal preview:
   - PostgreSQL Database
   - Web Service (Next.js)
5. Kliknite **Apply**

### 4️⃣ Dodajte Environment Variables

Ko se storitve ustvarijo, pojdite na **Web Service** → **Environment**:

```bash
# Render bo avtomatsko dodal DATABASE_URL iz PostgreSQL

# VI MORATE DODATI:
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://owepynxycxmexwvwjhqo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<vaš-key>
SUPABASE_SERVICE_ROLE_KEY=<vaš-service-key>
NEXTAUTH_SECRET=<generirajte-z-openssl-rand-base64-32>
NEXTAUTH_URL=https://mdv-radenci.onrender.com
NEXT_PUBLIC_APP_URL=https://mdv-radenci.onrender.com
```

Kliknite **Save Changes** - Render bo avtomatsko re-deployal.

### 5️⃣ Inicializirajte bazo

Na Render Dashboard pojdite na **PostgreSQL Database** → **Connect** → **External Connection**

Kopirajte **PSQL Command** in zaženite lokalno:

```bash
# Kopirajte PSQL ukaz iz Render
psql postgresql://mdv_user:PASSWORD@HOST/mdv_radenci

# Ko ste povezani, zaženite:
# Opcija A - kopirajte SQL iz vaših drizzle migration datotek
# Opcija B - uporabite lokalno Drizzle push
```

**ALI** lokalno zaženite Drizzle push:

```bash
# Nastavite DATABASE_URL na Render bazo (kopirajte Internal Database URL)
export DATABASE_URL="postgresql://mdv_user:PASSWORD@HOST/mdv_radenci"

# Push sheme
npm run db:push
```

### 6️⃣ Ustvarite admin uporabnika

```bash
# Generirajte bcrypt hash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('admin123', 10, (err, hash) => console.log(hash));"

# Povezava na Render bazo in insert:
psql "<RENDER_PSQL_URL>"

INSERT INTO users (id, email, name, password, role, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@mdv-radenci.si',
  'Administrator',
  '<BCRYPT_HASH>',
  'admin',
  NOW(),
  NOW()
);
```

### ✅ Končano!

Vaša aplikacija je zdaj dostopna na: **https://mdv-radenci.onrender.com**

Login: `admin@mdv-radenci.si` / `admin123`

---

## ⚠️ Pomembno

### Free Tier omejitve:
- **Spindown**: Aplikacija se ustavi po 15 minutah neaktivnosti
- **Cold start**: Prvi request po spindownu traja 30-60 sekund
- **Database**: 256 MB prostora

### Preprečitev spindowna (opcijsko):
1. Pojdite na [uptimerobot.com](https://uptimerobot.com)
2. Ustvarite brezplačen monitor
3. Dodajte URL: `https://mdv-radenci.onrender.com/api/health`
4. Interval: 5 minut

---

## 🔧 Troubleshooting

### Build fails
```bash
# Preverite logs v Render Dashboard → Logs
# Pogosto: missing environment variables
```

### Database connection error
```bash
# Preverite:
# 1. DATABASE_URL je nastavljen (Render ga avtomatsko doda)
# 2. Database je fully deployed (ne "Creating")
# 3. Tabele so ustvarjene (zaženite db:push)
```

### "No database found" error
```bash
# Zaženite database initialization:
npm run db:push
# ali ročno SQL ukaze
```

---

Za več informacij glejte **[RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)**
