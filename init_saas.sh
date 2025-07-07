#!/bin/bash

set -e

echo "🚀 SaaS Project Initializer (Bash Version)"

# Prompt user
read -p "Choose backend [none / fastapi / flask / django] (default: none): " BACKEND
BACKEND=${BACKEND:-none}

read -p "Choose database [none / supabase / mongodb / both] (default: none): " DB
DB=${DB:-none}

read -p "Use Clerk for auth? [yes/no] (default: no): " USE_CLERK
USE_CLERK=${USE_CLERK:-no}

# Save config
CONFIG_FILE=".saas-config.json"
mkdir -p packages/config

cat > $CONFIG_FILE <<EOL
{
  "frontend": "nextjs",
  "backend": "$BACKEND",
  "database": "$DB",
  "auth": "$USE_CLERK"
}
EOL

cat > packages/config/landing.json <<EOL
{
  "domain": "localhost",
  "title": "Your SaaS Title",
  "catch_phrase": "Launch your product fast!"
}
EOL

echo "📁 Creating folder structure..."

mkdir -p apps
mkdir -p scripts
mkdir -p packages/db

# === FRONTEND SETUP ===
if [ ! -d "apps/web" ]; then
  echo "📦 Setting up Next.js + TypeScript in apps/web"
  npx create-next-app@latest web --ts --eslint --app --src-dir --import-alias="@/*" --use-npm --no-git --no-install
  mv web apps/web
else
  echo "⚠️  apps/web already exists, skipping Next.js init"
fi

cd apps/web

# === TailwindCSS Setup ===
echo "🎨 Installing TailwindCSS..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

cat > tailwind.config.js <<EOL
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

cat > src/app/globals.css <<EOL
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

# === Clerk Auth Setup (Frontend only) ===
if [ "$USE_CLERK" == "yes" ]; then
  echo "🔐 Setting up Clerk..."
  npm install @clerk/nextjs
  echo 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-publishable-key-here' >> .env.local
  echo 'CLERK_SECRET_KEY=your-secret-key-here' >> .env.local
fi

cd ../../

# === BACKEND SETUP ===
if [ "$BACKEND" != "none" ]; then
  BACKEND_DIR="apps/backend/$BACKEND"
  mkdir -p $BACKEND_DIR

  if [ "$BACKEND" == "fastapi" ]; then
    echo "⚙️  Generating FastAPI starter..."
    cat > $BACKEND_DIR/main.py <<EOL
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}
EOL
    echo "fastapi\nuvicorn[standard]" > $BACKEND_DIR/requirements.txt

  elif [ "$BACKEND" == "flask" ]; then
    echo "⚙️  Generating Flask starter..."
    cat > $BACKEND_DIR/main.py <<EOL
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return {"message": "Hello from Flask!"}

if __name__ == "__main__":
    app.run(debug=True)
EOL
    echo "flask" > $BACKEND_DIR/requirements.txt

  elif [ "$BACKEND" == "django" ]; then
    echo "⚠️ Django setup is not yet automated. Skipping..."
  fi
fi

# === DATABASE SETUP ===
if [[ "$DB" == "supabase" || "$DB" == "both" ]]; then
  mkdir -p packages/db/supabase
fi
if [[ "$DB" == "mongodb" || "$DB" == "both" ]]; then
  mkdir -p packages/db/mongodb
fi

# === DONE ===
echo "✅ Project initialized!"
echo "📝 Config saved to $CONFIG_FILE"
echo ""
echo "Next steps:"
echo "- cd apps/web && npm install && npm run dev"
[ "$BACKEND" != "none" ] && echo "- cd apps/backend/$BACKEND && pip install -r requirements.txt && python main.py"
