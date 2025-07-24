import React from 'react'

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-2">
        Have questions or want to get in touch? We'd love to hear from you!
      </p>
      <p className="text-gray-600">
        Email us at <a href="mailto:hello@saasstarter.com" className="text-primary-600 underline">hello@saasstarter.com</a> or use the form below (coming soon).
      </p>
    </main>
  )
} 