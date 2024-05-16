//
// helper hook for DropDown UI element (to close dropdown menu when clicked outside)
//

// --- react api
import { useEffect, useRef } from "react";

const useClickOutside = (callbackFn: Function) => {
  let domNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let handler = (event: MouseEvent) => {
      if (!domNodeRef.current?.contains(event.target as Node)) {
        callbackFn();
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  return domNodeRef
}

export default useClickOutside;