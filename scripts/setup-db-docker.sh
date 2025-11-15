#!/bin/bash

# Script za nastavitev PostgreSQL baze z Docker

echo "🐳 Nastavitev PostgreSQL z Docker..."
echo ""

# Preveri če je Docker nameščen
if ! command -v docker &> /dev/null; then
    echo "❌ Docker ni nameščen!"
    echo "Namestite Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# Nastavi spremenljivke
CONTAINER_NAME="mdv-postgres"
DB_NAME="mdv_radenci"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_PORT="5432"

# Preveri če že obstaja container
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "⚠️  Container $CONTAINER_NAME že obstaja"
    read -p "Ali želite odstraniti obstoječi container? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker rm -f $CONTAINER_NAME
        echo "✅ Stari container odstranjen"
    else
        echo "❌ Prekinjam..."
        exit 1
    fi
fi

echo "🚀 Zaganjam PostgreSQL Docker container..."
docker run --name $CONTAINER_NAME \
    -e POSTGRES_PASSWORD=$DB_PASSWORD \
    -e POSTGRES_DB=$DB_NAME \
    -p $DB_PORT:5432 \
    -d postgres:15

if [ $? -eq 0 ]; then
    echo "✅ PostgreSQL container uspešno zagnan!"
    
    # Počakaj da se PostgreSQL zažene
    echo "⏳ Čakam da se PostgreSQL zažene..."
    sleep 5
    
    # Posodobi .env datoteko
    DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@localhost:$DB_PORT/$DB_NAME"
    
    if [ -f .env ]; then
        # Zamenjaj DATABASE_URL v .env
        if grep -q "DATABASE_URL=" .env; then
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=\"$DATABASE_URL\"|" .env
            else
                # Linux
                sed -i "s|DATABASE_URL=.*|DATABASE_URL=\"$DATABASE_URL\"|" .env
            fi
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
    echo "✅ PostgreSQL Docker container je pripravljen!"
    echo ""
    echo "📝 Uporabni ukazi:"
    echo "  docker ps                    - Seznam aktivnih containerjev"
    echo "  docker stop $CONTAINER_NAME  - Ustavi container"
    echo "  docker start $CONTAINER_NAME - Zaženi container"
    echo "  docker logs $CONTAINER_NAME  - Preglej logove"
    echo "  docker exec -it $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME - Poveži se na bazo"
    echo ""
    echo "DATABASE_URL: $DATABASE_URL"
    
else
    echo "❌ Napaka pri zagonu Docker containerja!"
    exit 1
fi
