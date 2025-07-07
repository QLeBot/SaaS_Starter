#!/bin/bash

set -e

echo "�� Setting up Next.js Frontend with TypeScript and TailwindCSS"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if apps/web already exists
if [ -d "apps/frontend" ]; then
    print_warning "apps/frontend already exists. Do you want to overwrite it? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_status "Skipping frontend setup"
        exit 0
    fi
    rm -rf apps/frontend
fi

# Create apps directory if it doesn't exist
mkdir -p apps

print_status "Creating Next.js app with TypeScript..."
npx create-next-app@latest frontend \
    --typescript \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --import-alias "@/*" \
    --use-npm \
    --no-git \
    --yes

# Move to apps/web
mv frontend apps/frontend
cd apps/frontend

print_status "Installing additional dependencies..."

# Install UI and utility libraries
npm install @headlessui/react @heroicons/react
npm install clsx tailwind-merge
npm install react-hook-form @hookform/resolvers zod

# Install animation libraries
npm install framer-motion

# Install date handling
npm install date-fns

# Install HTTP client
npm install axios

print_status "Setting up TailwindCSS configuration..."

# Create enhanced tailwind config
cat > tailwind.config.ts << 'EOL'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
EOL

print_status "Setting up utility functions..."

# Create utils directory and files
mkdir -p src/lib
mkdir -p src/components/ui
mkdir -p src/hooks

# Create utility functions
cat > src/lib/utils.ts << 'EOL'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
EOL

# Create Button component
cat > src/components/ui/Button.tsx << 'EOL'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
      ghost: 'hover:bg-gray-100',
    }
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-8 text-lg',
    }
    
    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
EOL

# Create Input component
cat > src/components/ui/Input.tsx << 'EOL'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
EOL

print_status "Setting up environment variables..."

# Create .env.local with common variables
cat > .env.local << 'EOL'
# Frontend Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Your SaaS App

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Authentication (uncomment and configure as needed)
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
# CLERK_SECRET_KEY=your-clerk-secret-key

# Supabase (uncomment and configure as needed)
# NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# MongoDB (uncomment and configure as needed)
# MONGODB_URI=your-mongodb-connection-string
EOL

print_status "Setting up landing page configuration..."

# Create config directory if it doesn't exist
mkdir -p ../../packages/config

# Create landing page config
cat > ../../packages/config/landing.json << 'EOL'
{
  "domain": "localhost",
  "title": "Your SaaS Title",
  "catchPhrase": "Launch your product fast!",
  "description": "A modern SaaS starter kit for rapid product launches",
  "features": [
    {
      "title": "Fast Setup",
      "description": "Get your SaaS up and running in minutes",
      "icon": "⚡"
    },
    {
      "title": "Modern Stack",
      "description": "Built with Next.js, TypeScript, and TailwindCSS",
      "icon": "🚀"
    },
    {
      "title": "Scalable",
      "description": "Ready to scale with your business",
      "icon": "📈"
    }
  ],
  "pricing": {
    "plans": [
      {
        "name": "Starter",
        "price": 9,
        "period": "month",
        "features": ["Feature 1", "Feature 2", "Feature 3"]
      },
      {
        "name": "Pro",
        "price": 29,
        "period": "month",
        "features": ["Everything in Starter", "Feature 4", "Feature 5"]
      }
    ]
  },
  "contact": {
    "email": "hello@yourdomain.com",
    "twitter": "@yourhandle"
  }
}
EOL

print_status "Creating basic pages and components..."

# Create a basic landing page component
cat > src/components/LandingPage.tsx << 'EOL'
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import landingConfig from '../../../packages/config/landing.json'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement email subscription
    console.log('Email subscribed:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              {landingConfig.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              {landingConfig.catchPhrase}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {landingConfig.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {landingConfig.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-gray-50"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who have already launched their SaaS.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white"
              required
            />
            <Button type="submit" variant="secondary" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
EOL

# Update the main page to use the landing page component
cat > src/app/page.tsx << 'EOL'
import LandingPage from '@/components/LandingPage'

export default function Home() {
  return <LandingPage />
}
EOL

print_status "Setting up package.json scripts..."

# Update package.json to add useful scripts
npm pkg set scripts.dev="next dev"
npm pkg set scripts.build="next build"
npm pkg set scripts.start="next start"
npm pkg set scripts.lint="next lint"
npm pkg set scripts.type-check="tsc --noEmit"

cd ../..

print_success "Frontend setup complete!"
echo ""
print_status "Next steps:"
echo "1. cd apps/frontend"
echo "2. npm install"
echo "3. npm run dev"
echo ""
print_status "Don't forget to:"
echo "- Update packages/config/landing.json with your content"
echo "- Configure environment variables in apps/frontend/.env.local"
echo "- Set up authentication (Clerk or Supabase) if needed" 