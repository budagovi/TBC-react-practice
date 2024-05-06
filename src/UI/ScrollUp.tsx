// helper component for scrolling to the top of page
'use client'
import { useEffect } from 'react'

export default function ScrollUp() {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), [])
  return null
}