#!/bin/bash

# Script za nastavitev PostgreSQL baze za MDV Radenci projekt

echo "🚀 Nastavitev PostgreSQL baze za MDV Radenci..."
echo ""

# Preveri če je PostgreSQL nameščen
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL ni nameščen!"
    echo ""
    echo "Možnosti za namestitev:"
    echo ""
    echo "1. Lokalna namestitev PostgreSQL:"
    echo "   Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
    echo "   MacOS: brew install postgresql"
    echo ""
    echo "2. Docker (priporočeno za razvoj):"
    echo "   docker run --name mdv-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mdv_radenci -p 5432:5432 -d postgres:15"
    echo ""
    exit 1
fi

# Nastavi spremenljivke
DB_NAME="mdv_radenci"
DB_USER="${POSTGRES_USER:-postgres}"
DB_PASSWORD="${POSTGRES_PASSWORD:-postgres}"
DB_HOST="${POSTGRES_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"

echo "📦 Ustvarjam bazo $DB_NAME..."

# Ustvari bazo
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME"

if [ $? -eq 0 ]; then
    echo "✅ Baza $DB_NAME uspešno ustvarjena!"
    
    # Posodobi .env datoteko
    DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
    
    if [ -f .env ]; then
        # Zamenjaj DATABASE_URL v .env
        if grep -q "DATABASE_URL=" .env; then
            sed -i.bak "s|DATABASE_URL=.*|DATABASE_URL=\"$DATABASE_URL\"|" .env
            echo "✅ .env datoteka posodobljena"
        else
            echo "DATABASE_URL=\"$DATABASE_URL\"" >> .env
            echo "✅ DATABASE_URL dodan v .env"
        fi
    else
        echo "❌ .env datoteka ne obstaja!"
        echo "Kopirajte .env.example v .env:"
        echo "  cp .env.example .env"
        exit 1
    fi
    
    echo ""
    echo "🔧 Generiram in izvajam database migracije..."
    npm run db:generate
    npm run db:migrate
    
    echo ""
    echo "✅ Baza je pripravljena!"
    echo ""
    echo "DATABASE_URL: $DATABASE_URL"
    echo ""
    echo "Naslednji koraki:"
    echo "1. Ustvarite prvega admin uporabnika (glej README.md)"
    echo "2. Zaženite dev server: npm run dev"
    
else
    echo "❌ Napaka pri ustvarjanju baze!"
    exit 1
fi
