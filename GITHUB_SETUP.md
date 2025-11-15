# 🚀 GitHub Setup Navodila

## 1️⃣ Inicializiraj Git repozitorij

```bash
cd /home/omarchb/Documents/faks-projekti/mdv-radenci

# Inicializiraj git
git init

# Nastavi glavno branch ime
git branch -M main
```

## 2️⃣ Preveri varnostne ukrepe

```bash
# POMEMBNO: Preveri da .env NI v git
git status | grep ".env"
# Če vidiš .env, NEMOJ nadaljevati! Preveri .gitignore

# Preveri .gitignore
cat .gitignore | grep "\.env"
# Morali bi videti: .env

# Scan za občutljive podatke
grep -r "postgresql://.*:.*@" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.example" --exclude="*.md"
```

**✅ Če ni najdenih zadetkov, lahko nadaljujete!**

## 3️⃣ Ustvari .gitignore (že narejeno)

`.gitignore` že vključuje:
- ✅ `.env` in vse `.env.*` datoteke
- ✅ `node_modules/`
- ✅ `.next/` in build datoteke
- ✅ Database backups
- ✅ Lokalne development datoteke

## 4️⃣ Naredi prvi commit

```bash
# Dodaj vse datoteke
git add .

# Preveri kaj boš committal
git status

# POMEMBNO: Preveri da .env NI v "Changes to be committed"
# Če je, odstrani ga:
# git reset HEAD .env

# Naredi commit
git commit -m "Initial commit: MDV Radenci website

- Next.js 14 with TypeScript
- PostgreSQL with Drizzle ORM
- NextAuth.js authentication
- Supabase Storage for images
- Admin panel for content management
- Responsive design with Tailwind CSS"
```

## 5️⃣ Ustvari GitHub repozitorij

### Opcija A: Preko GitHub UI

1. Pojdi na [github.com](https://github.com)
2. Klikni "New repository"
3. Nastavitve:
   - **Repository name**: `mdv-radenci-website`
   - **Description**: Spletna stran za Mladinsko društvo Vrelec Radenci
   - **Visibility**: Private (priporočeno) ali Public
   - **NE** dodajaj README, .gitignore ali LICENSE (že imaš lokalno)

### Opcija B: Preko GitHub CLI

```bash
# Če imaš GitHub CLI nameščen
gh repo create mdv-radenci-website --private --source=. --remote=origin
```

## 6️⃣ Poveži z GitHub

```bash
# Zamenjaj USERNAME z svojim GitHub uporabniškim imenom
git remote add origin https://github.com/USERNAME/mdv-radenci-website.git

# ALI če uporabljaš SSH:
git remote add origin git@github.com:USERNAME/mdv-radenci-website.git

# Preveri
git remote -v
```

## 7️⃣ Push na GitHub

```bash
# Push prvi commit
git push -u origin main
```

## 8️⃣ Nastavi GitHub Secrets (za CI/CD)

Če želiš uporabljati GitHub Actions za deployment:

1. Pojdi na **Settings** > **Secrets and variables** > **Actions**
2. Dodaj naslednje secrets:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 9️⃣ Zaščiti main branch (opcijsko)

1. Pojdi na **Settings** > **Branches**
2. Dodaj branch protection rule za `main`
3. Omogoči:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

## 🔟 Nastavi GitHub Pages (opcijsko)

Če želiš hostati dokumentacijo:

1. Pojdi na **Settings** > **Pages**
2. Source: Deploy from a branch
3. Branch: `main` / folder: `/docs` ali `/root`

---

## 🔒 Varnostni Checklist pred push-om

- [ ] `.env` je v `.gitignore`
- [ ] `.env` **NI** v `git status`
- [ ] Nobenih resničnih API ključev v kodi
- [ ] Nobenih resničnih gesel v dokumentaciji
- [ ] `.env.example` ima samo placeholder vrednosti
- [ ] README.md ne vsebuje občutljivih podatkov
- [ ] Preverjeno z `PRE_COMMIT_CHECKLIST.md`

## 📋 Useful Git Commands

```bash
# Preveri status
git status

# Preveri kaj je spremenjeno
git diff

# Dodaj specifične datoteke
git add file1 file2

# Commit z sporočilom
git commit -m "Your message"

# Push na GitHub
git push

# Pull spremembe
git pull

# Ustvari nov branch
git checkout -b feature/new-feature

# Preklopi branch
git checkout main

# Merge branch
git merge feature/new-feature

# Preveri zgodovino
git log --oneline
```

## 🚨 V primeru napake

### Če ste slučajno commitali .env:

```bash
# 1. TAKOJ odstranite iz staging
git reset HEAD .env

# 2. Če je že v commit, ampak še ne pushano
git reset --soft HEAD~1
git reset HEAD .env
git commit -m "Your commit message"

# 3. Če je že pushano na GitHub
# TAKOJ SPREMENITE VSE KLJUČE IN GESLA!
# Potem:
git rm --cached .env
git commit -m "Remove .env from repository"
git push
```

### Če ste pushali občutljive podatke:

1. **NAJPREJ**: Spremenite vse občutljive ključe/gesla TAKOJ!
2. Revoke-ajte stare API keys v Supabase/NextAuth
3. Uporabite BFG Repo-Cleaner za čiščenje zgodovine:
   ```bash
   # Download BFG
   # https://rtyley.github.io/bfg-repo-cleaner/
   
   java -jar bfg.jar --delete-files .env
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   git push --force
   ```

---

## 📞 Pomoč

Če naletite na težave:
- Preverite `SECURITY.md` za varnostna navodila
- Preverite `PRE_COMMIT_CHECKLIST.md` pred commit-om
- GitHub dokumentacija: https://docs.github.com

**Sreča pri razvoju! 🚀**
