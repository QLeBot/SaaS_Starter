import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FooterLink {
  label: string
  href: string
}

interface FooterSectionProps {
  title: string
  links: FooterLink[]
}

interface FooterBrandProps {
  productName: string
  description: string
}

interface FooterLegalLink extends FooterLink {}

interface FooterProps {
  className?: string
  productName?: string
  description?: string
  sections?: FooterSectionProps[]
  legalLinks?: FooterLegalLink[]
}

function FooterBrand({ productName, description }: FooterBrandProps) {
  return (
    <div className="col-span-1 md:col-span-2">
      <div className="flex items-center space-x-3 mb-4">
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
        <span className="text-xl font-bold text-gray-900">{productName}</span>
      </div>
      <p className="text-gray-600 text-sm max-w-md">{description}</p>
    </div>
  )
}

function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterLegal({ legalLinks }: { legalLinks: FooterLegalLink[] }) {
  return (
    <div className="flex items-center space-x-6">
      {legalLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

// Default content
const defaultSections: FooterSectionProps[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Documentation', href: '/docs' },
      { label: 'API', href: '/api' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

const defaultLegalLinks: FooterLegalLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Legal', href: '/legal' },
]

export function Footer({
  className,
  productName = 'SaaS Starter',
  description = 'Empowering businesses with modern SaaS solutions. Built for scale, designed for success.',
  sections = defaultSections,
  legalLinks = defaultLegalLinks,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn(
      'border-t border-gray-200 bg-white',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand/Info */}
          <FooterBrand productName={productName} description={description} />
          {/* Dynamic Sections */}
          {sections.map((section, idx) => (
            <FooterSection key={section.title + idx} {...section} />
          ))}
        </div>
        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-600">
              © {currentYear} {productName}. All rights reserved.
            </div>
            {/* Legal Links */}
            <FooterLegal legalLinks={legalLinks} />
          </div>
        </div>
      </div>
    </footer>
  )
}
