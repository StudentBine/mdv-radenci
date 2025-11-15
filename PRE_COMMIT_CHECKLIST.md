# ✅ Pre-Commit Checklist

Preden naredite commit in push na GitHub, preverite naslednje:

## 🔒 Varnost

- [ ] `.env` datoteka **NI** v repozitoriju (preverite z `git status`)
- [ ] Nobenih resničnih API ključev v kodi
- [ ] Nobenih resničnih gesel v kodi ali dokumentaciji
- [ ] Nobenih database connection stringov z resničnimi credentials
- [ ] `.gitignore` vključuje vse občutljive datoteke

## 🧹 Cleanup

- [ ] Odstranjene debug `console.log()` stavke
- [ ] Odstranjene zakomentirane kode
- [ ] Odstranjene TODO komentarji z občutljivimi informacijami
- [ ] Nobenih local development datotek (STATUS.md, NOTES.md, itd.)

## 📝 Dokumentacija

- [ ] README.md je posodobljen
- [ ] `.env.example` ima placeholder vrednosti (ne resničnih)
- [ ] Komentarji v kodi so jasni in ne vsebujejo občutljivih podatkov

## 🧪 Testiranje

- [ ] Aplikacija se build-a brez napak: `npm run build`
- [ ] Linter ne prikazuje napak: `npm run lint`
- [ ] Ni dependency varnostnih opozoril: `npm audit`

## 📦 Git

- [ ] Commit message je jasen in descriptiven
- [ ] Uporabljeni so smiselni commit-i (ne "wip" ali "test")
- [ ] Branch ime je descriptivno

## 🚀 Hitri ukazi za preverjanje

```bash
# 1. Preveri status
git status

# 2. Preveri da .env NI v staging
git ls-files | grep -E "\.env$|\.env\."

# 3. Preveri za občutljive podatke
grep -r "password.*=" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.md"
grep -r "secret.*=" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.md"

# 4. Build test
npm run build

# 5. Lint check
npm run lint

# 6. Security audit
npm audit
```

## ⚠️ Če ste slučajno commitali občutljive podatke

### Če še niste pushali:
```bash
# Reset zadnjega commita
git reset HEAD~1

# ALI amend commit
git commit --amend
```

### Če ste že pushali:
1. **TAKOJ** spremenite vse občutljive ključe/gesla
2. Kontaktirajte GitHub support za odstranitev občutljivih podatkov
3. Uporabite `git filter-branch` ali BFG Repo-Cleaner
4. Force push po čiščenju (POZOR!)

## 📞 V sili

Če ste commitali občutljive podatke:
1. Takoj spremenite vse ključe/gesla
2. Revoke-ajte stare API keys
3. Kontaktirajte team

---

**Varnost je pomembna! Preverite dvakrat preden pushate. 🛡️**