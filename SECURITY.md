# 🔒 Varnostna navodila

## ⚠️ PRED DEPLOY-OM NA PRODUKCIJO

### Obvezni varnostni ukrepi:

1. **Okoljske spremenljivke**
   - ✅ Nikoli ne commitajte `.env` datoteke
   - ✅ Generirajte nove ključe za produkcijo
   - ✅ Uporabite močna gesla za bazo

2. **NextAuth Secret**
   ```bash
   # Generiraj nov secret za produkcijo
   openssl rand -base64 32
   ```

3. **Admin geslo**
   - ✅ Spremenite privzeto admin geslo TAKOJ po prvi prijavi
   - ✅ Uporabite močno geslo (min 12 znakov, velike/male črke, številke, simboli)
   - ✅ Nikoli ne delite admin gesel

4. **Database**
   - ✅ Uporabite močna gesla za database uporabnike
   - ✅ Omejite dostop do baze (samo specifični IP-ji)
   - ✅ Redno delajte backupe

5. **Supabase**
   - ✅ Nikoli ne delite Service Role ključa javno
   - ✅ Nastavite RLS (Row Level Security) policies
   - ✅ Omejite dovoljenja na minimalno potrebno

## 🚫 Kaj NIKOLI ne sme biti na GitHub-u:

- ❌ `.env` datoteka z resničnimi ključi
- ❌ Database credentials
- ❌ Service role keys
- ❌ Production API keys
- ❌ Hashirana gesla
- ❌ Private keys (.pem, .key datoteke)
- ❌ Database backups z občutljivimi podatki

## ✅ Kaj LAHKO/MORA biti na GitHub-u:

- ✅ `.env.example` (brez resničnih vrednosti)
- ✅ Izvorna koda
- ✅ Dokumentacija
- ✅ Public assets (slike, ikone)
- ✅ Konfiguracija (brez občutljivih podatkov)

## 🔐 Production Checklist

Preden deployate na produkcijo:

- [ ] Spremenite vse privzete gesle
- [ ] Generirajte nove production ključe
- [ ] Nastavite HTTPS (SSL certifikat)
- [ ] Omogočite CORS samo za vaše domene
- [ ] Omejite rate limiting na API endpoints
- [ ] Nastavite database backups
- [ ] Konfigurirajte error monitoring (Sentry, itd.)
- [ ] Preverite da `.env` NI v git repozitoriju
- [ ] Nastavite Content Security Policy headers
- [ ] Omogočite database connection pooling
- [ ] Skrijte dev nastavitve (npm run build)

## 🛡️ Priporočila za varnost

### 1. Environment Variables
```env
# DEVELOPMENT (.env.local)
DATABASE_URL="postgresql://localhost:5432/dev_db"
NEXTAUTH_SECRET="dev-secret-12345"

# PRODUCTION (v hosting platformi)
DATABASE_URL="postgresql://user:strong_password@host:5432/prod_db"
NEXTAUTH_SECRET="production-secure-random-secret-min-32-chars"
```

### 2. Admin dostop
- Uporabite 2FA (Two-Factor Authentication) če je možno
- Loggirajte vse admin aktivnosti
- Redno pregledujte access logs
- Omejite število prijav (rate limiting)

### 3. Database
- Uporabite connection pooling
- Omejite število sočasnih povezav
- Omogočite SSL za database connections
- Redno update-ajte PostgreSQL

### 4. API endpoints
- Vedno preverjajte avtentikacijo
- Validirajte vse inpute
- Uporabljajte prepared statements (Drizzle ORM to že dela)
- Omejite velikost upload-ov

### 5. File uploads (Supabase)
- Omejite tipe datotek (samo slike)
- Omejite velikost datotek (max 5MB)
- Skenirajte datoteke za viruse (če je možno)
- Uporabljajte unikatna imena datotek

## 🚨 V primeru varnostnega incidenta

1. **Takoj spremenite vse občutljive ključe:**
   - Database gesla
   - API keys (Supabase, NextAuth)
   - Admin gesla

2. **Preglejte logs:**
   - Kdo je imel dostop
   - Kdaj se je incident zgodil
   - Kakšni podatki so bili kompromitirani

3. **Obvestite uporabnike** (če so bili njihovi podatki prizadeti)

4. **Popravite ranljivost:**
   - Update dependencies
   - Patch security hole
   - Izboljšajte varnostne ukrepe

## 📞 Kontakt za varnostne zadeve

Če odkrijete varnostno ranljivost, prosimo kontaktirajte:
- Email: security@mdv-radenci.si
- **NE** odprite public issue na GitHub-u

## 📚 Dodatni viri

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/deploying/production-checklist)
- [Supabase Security](https://supabase.com/docs/guides/platform/going-into-prod)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/security.html)

---

**Varnost je prioriteta. Vedno bolje varno kot obžalovati! 🛡️**
