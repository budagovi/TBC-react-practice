// --- react api
import { useRef, useLayoutEffect, useMemo } from 'react';

/**
 * Custom Hook for debounce functionality
 * @param callback - a function that needs to be debounced, 
 * @param delay - The debounce delay in milliseconds, with a default value of 500ms.
 * @returns updated state/value
 */

const useDebounce = (callback: (...args: any[]) => void, delay: number = 500) => {

  // holds the current reference to the callback function.
  const callbackRef = useRef(callback);

  // ensures that callbackRef.current is always the latest version of the callback
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  let timer: any;

  const naiveDebounce = (
    func: (...args: any[]) => void,
    delayMs: number,
    ...args: any[]
  ) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delayMs);
  };

  return useMemo(() => (...args: any) =>
    naiveDebounce(callbackRef.current, delay, ...args), [delay]
  );
};

export default useDebounce