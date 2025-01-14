import { useEffect } from "react";

export const useDebounce = (
  value: string,
  delay: number,
  callback: (value: string) => void
) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);
};
