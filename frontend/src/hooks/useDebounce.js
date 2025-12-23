import { useEffect, useState } from "react";

/**
 * useDebounce - Returns a debounced value
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 */
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
