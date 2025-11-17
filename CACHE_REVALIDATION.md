# 🔄 Cache Revalidation Guide

## Problem

Next.js static generation (`next build`) pre-renders strani in jih cache-ira na Vercel CDN. Ko spremenjaš podatke v bazi, moraš Vercel obvestiti, da pregenerira te strani.

## ✅ Rešitve

### 1. **Avtomatska revalidacija (Priporočeno)**

Ko briješ, urediš ali kreijaš novico, se avtomatski pokličejo:

```typescript
// src/app/api/news/route.ts
revalidatePath('/');           // Refresh home page
revalidatePath('/novice');     // Refresh news list

// src/app/api/news/[id]/route.ts
revalidatePath(`/novice/${slug}`);  // Refresh article page
```

**Ko se avtomatski sproži:**
- ✅ POST /api/news (ustvari novico)
- ✅ PUT /api/news/[id] (uredi novico)
- ✅ DELETE /api/news/[id] (izbriši novico)

### 2. **Ročna revalidacija (Za nujne primere)**

Koristbiš endpoint `/api/revalidate` s tokenom:

```bash
# Refresh home in novice pages
curl -X POST \
  "https://tvoja-domena.vercel.app/api/revalidate?token=YOUR_TOKEN&paths=/,/novice"

# Refresh samo domačo stran
curl -X POST \
  "https://tvoja-domena.vercel.app/api/revalidate?token=YOUR_TOKEN&paths=/"
```

## 🔐 Setup na Vercel-u

1. Pojdi na [Vercel Dashboard](https://vercel.com/dashboard)
2. Izberi projekt `mdv-radenci`
3. Pojdi v **Settings** → **Environment Variables**
4. Dodaj novo spremenljivko:

```
Name: REVALIDATE_TOKEN
Value: <generiraj-random-token> (npr. openssl rand -base64 32)
```

## 🧪 Testiranje

Lokalno (dev mode):
```bash
npm run dev

# V drugem terminalu:
curl -X POST \
  "http://localhost:3000/api/revalidate?token=YOUR_TOKEN&paths=/,/novice"
```

## 📌 Kaj se zgodi?

### Ko je avtomatska revalidacija aktivna:
1. Urediš novico v admin panelu
2. API kliče `revalidatePath('/novice')`
3. Vercel invalidira cache za /novice
4. Ob naslednjem zahtevku se stran regenerira
5. Uporabniki vidijo novo verzijo

### Ko je avtomatska revalidacija deaktivna:
1. Urediš novico v admin panelu
2. Vercel se ne ve za spremembo
3. Stara verzija se še vedno prikazuje (cachirana)
4. **REŠITEV:** ročno kliči `/api/revalidate` endpoint

## ⚙️ ISR (Incremental Static Regeneration)

Alternativa je uporaba ISR s časovnim limitom:

```typescript
// src/components/home/NewsSection.tsx
export const revalidate = 3600; // Regenerate vsakih 1 ure
```

Ali na dinamičnih straneh:

```typescript
export const dynamic = 'force-dynamic'; // Vedno fresh iz baze
```

## 📝 Opomba

V tvojem primeru je problem verjetno, da je testna novica bila v `next build` cachirana pred tistim ko si jo izbrisal iz baze.

**Rešitev:**
1. Pushaj nove spremembe s `revalidatePath` kode
2. Triggeraj Vercel redeploy
3. Novo deployment bo avtomatsko invalidiral cache

```bash
git add .
git commit -m "fix: add automatic cache revalidation for news"
git push
```

Vercel bo avtomatsko rebuild-al in deployral novo verzijo z novim `revalidatePath` kodom! 🚀
