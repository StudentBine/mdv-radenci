# Render Database Setup

## Koraki za inicializacijo baze na Render:

### 1. Dobite DATABASE_URL iz Render Dashboard

1. Pojdite na Render Dashboard → PostgreSQL Database (`mdv-radenci-db`)
2. Kliknite na **Connect** tab
3. Kopirajte **Internal Database URL** (začne se z `postgresql://`)
   - Format: `postgresql://user:password@host:5432/database`

### 2. Inicializirajte tabele z Drizzle

Na vašem lokalnem računalniku:

```bash
# Nastavite DATABASE_URL na Render bazo (ZAČASNO)
export DATABASE_URL="postgresql://user:password@host:5432/database"

# Push sheme v bazo
npm run db:push
```

**POMEMBNO**: Po push-u odstranite export DATABASE_URL, da ne prepisate lokalne baze!

### 3. Ustvarite admin uporabnika

Potrebujete prvega admin uporabnika za prijavo.

#### Korak 3.1: Generirajte bcrypt hash gesla

```bash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('admin123', 10, (err, hash) => console.log(hash));"
```

To bo izpisalo nekaj kot:
```
$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGH
```

#### Korak 3.2: Povežite se na Render bazo preko PSQL

```bash
# Kopirajte PSQL Command iz Render Dashboard → Database → Connect → External Connection
psql "postgresql://user:password@host:5432/database"
```

#### Korak 3.3: Insert admin uporabnika

V PSQL konzoli:

```sql
INSERT INTO users (id, email, name, password, role, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@mdv-radenci.si',
  'Administrator',
  '$2b$10$PASTE_YOUR_HASH_HERE',  -- Zamenjajte s pravim hash-om
  'admin',
  NOW(),
  NOW()
);
```

Preverite:
```sql
SELECT email, name, role FROM users;
```

### 4. Ponovno deployajte na Render

Pojdite nazaj na Render Dashboard → Web Service → **Manual Deploy**

Build bi moral zdaj uspeti!

### 5. Testiranje

Obiščite: `https://mdv-radenci.onrender.com/admin/login`

Prijavite se:
- Email: `admin@mdv-radenci.si`
- Geslo: `admin123` (ali kar ste uporabili)

---

## Troubleshooting

### "permission denied for schema public"

Če dobite to napako, zaženite:

```sql
GRANT ALL ON SCHEMA public TO your_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user;
```

### "database does not exist"

Preverite, da uporabljate **Internal Database URL**, ne External!

### Pozabljeno geslo

Reset geslo za obstoječega uporabnika:

```sql
-- Generirajte nov hash lokalno, nato:
UPDATE users 
SET password = '$2b$10$NEW_HASH_HERE'
WHERE email = 'admin@mdv-radenci.si';
```

---

## Hitri priklic ukazov

```bash
# 1. Lokalno - push sheme
export DATABASE_URL="<RENDER_INTERNAL_URL>"
npm run db:push
unset DATABASE_URL

# 2. Lokalno - generiraj hash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('PASSWORD', 10, (err, hash) => console.log(hash));"

# 3. PSQL - insert admin
psql "<RENDER_EXTERNAL_URL>"
# nato INSERT ukaz iz zgoraj
```
