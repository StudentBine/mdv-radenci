# 🔒 Varnostna zaščita - DoS in Rate Limiting

## ✅ Implementirane zaščite

### 1. **Rate Limiting Middleware** (`src/middleware.ts`)

Globalna zaščita vseh API endpoint-ov:

#### Omejitve po endpoint-ih:
- **Login API** (`/api/auth/login`): **5 poskusov / 15 minut**
- **Upload API** (`/api/upload`): **10 nalaganj / minuto**
- **Mutation API** (POST/PUT/DELETE): **30 zahtevkov / minuto**
- **Ostali API-ji** (GET): **100 zahtevkov / minuto**

#### Varnostni headerji:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 2. **Rate Limit Utility** (`src/lib/rate-limit.ts`)

Prilagodljivi rate limiter za specifične use case:

```typescript
// Preddefinirane konfiguracije:
- apiLimiter: 30 zahtevkov / minuto
- authLimiter: 5 poskusov / 15 minut (za prijave)
- uploadLimiter: 10 nalaganj / minuto
```

### 3. **API Helpers** (`src/lib/api-helpers.ts`)

Varnostne pomožne funkcije:

#### Input Validation:
- `validateEmail()` - Preveri format e-pošte
- `validatePassword()` - Preveri moč gesla (min 8 znakov, velika/mala črka, številka)
- `validateStringLength()` - Preveri dolžino vnosa
- `sanitizeString()` - Odstrani nevarne znake

#### CORS Protection:
- `getCorsHeaders()` - Dovoljeni origin-i za produkcijo

#### Response Helpers:
- `errorResponse()` - Standardiziran error response
- `successResponse()` - Standardiziran success response

### 4. **Custom Login API** (`src/app/api/auth/login/route.ts`)

Zaščiten login endpoint z:
- Rate limiting (5 poskusov / 15 minut)
- IP tracking
- Rate limit headers v response-u

## 🚀 Produkcijska nastavitev

### Environment Variables

Dodaj v `.env.production`:

```env
# Application URL (za CORS)
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Rate limiting (opcijsko - privzeto je že nastavljeno)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### Deployment na Vercel

Varnostne nastavitve so že vključene v `middleware.ts` in bodo avtomatsko aktivne na Vercel-u.

**Pomembno:** Vercel Edge Network ima že vgrajen DDoS protection, middleware pa doda dodatno plast zaščite na aplikacijskem nivoju.

## 📊 Monitoring

Rate limit headers v response-u:

```
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 29
X-RateLimit-Reset: 45
```

Ko uporabnik preseže limit, dobi:

```json
{
  "error": "Preveč zahtevkov",
  "message": "Prosimo počakajte nekaj trenutkov pred naslednjim poskusom."
}
```

Status: `429 Too Many Requests`
Header: `Retry-After: 60`

## 🛡️ Dodatne priporočljive zaščite

### 1. Cloudflare (opcijsko)
- Dodaten DDoS protection layer
- Web Application Firewall (WAF)
- Bot protection

### 2. Vercel Analytics
- Monitoring prometa
- Odkrivanje anomalij

### 3. Supabase/Neon Row Level Security
- Database-level zaščita
- RLS policies za vse tabele

## 🔧 Testiranje

Test rate limiting lokalno:

```bash
# Test login endpoint (5 poskusov)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}' \
    -w "\nStatus: %{http_code}\n"
done
```

Po 5. poskusu bi moral dobiti `429 Too Many Requests`.

## ⚠️ Omejitve

**In-memory store:**
- Rate limit counters so shranjeni v memory
- Na Vercel serverless functions se memory resetira
- Za produkcijsko okolje s večimi instancami priporoči se Redis ali podobna rešitev

**Upgrade na Redis** (opcijsko):
```bash
npm install ioredis
```

Potem posodobi `src/lib/rate-limit.ts` da uporablja Redis namesto in-memory store-a.

## 📝 Changelog

- **v1.0** - Initial rate limiting implementation
  - Global middleware za vse API route
  - Specifični limiti za auth/upload/mutation
  - Input validation helpers
  - Security headers
  - CORS protection

