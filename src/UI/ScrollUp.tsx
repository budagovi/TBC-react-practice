'use client'

// *
// * Helper component for scrolling to the top on navigation
// *

// --- next.js/react api
import { useEffect } from 'react'

const ScrollUp = () => {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), [])
  return null
}

export default ScrollUp;