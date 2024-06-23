'use client'

import { useEffect, useState } from "react";

/**
 * Function detecting when clien-side rendering is active
 * @returns {boolean}
 */
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  })

  return isClient;
}

export default useIsClient;