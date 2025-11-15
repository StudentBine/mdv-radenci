# Build script za Render.com
# Ta skripta se zažene pred main build command

echo "🚀 Starting Render build process..."
echo "📦 Installing dependencies..."

npm ci

echo "✅ Dependencies installed"
echo "🏗️  Building Next.js application..."

npm run build

echo "✅ Build completed successfully!"
