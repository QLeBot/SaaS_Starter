"use client"

import LandingPage from '@/components/LandingPage'
import BasicLandingPage from '@/components/BasicLandingPage'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Home() {
  const [showBasic, setShowBasic] = useState(false)

  return (
    <div>
      <div className="flex justify-center py-4">
        <Button onClick={() => setShowBasic((prev) => !prev)}>
          {showBasic ? 'Show Full Landing Page' : 'Show Basic Landing Page'}
        </Button>
      </div>
      {showBasic ? <BasicLandingPage /> : <LandingPage />}
    </div>
  )
}
