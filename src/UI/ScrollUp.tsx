'use client'
// --- next.js/react api
import { useEffect } from 'react'

/**
 * Helper component for scrolling to the top on navigation/refresh (for server components)
 */

const ScrollUp = () => {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), [])
  return null
}

export default ScrollUp;