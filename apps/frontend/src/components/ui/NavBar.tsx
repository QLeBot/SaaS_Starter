import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavBarProps {
  className?: string
  productName?: string
}

export function NavBar({ className, productName = "SaaS Starter" }: NavBarProps) {
  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60",
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Product Name - Left Side */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              {/* Logo */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              {/* Product Name */}
              <span className="text-xl font-bold text-gray-900">{productName}</span>
            </Link>
          </div>

          {/* Navigation Links - Right Side */}
          <div className="flex items-center space-x-8">
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
