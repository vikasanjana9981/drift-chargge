import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value change.
 * @param value - The input value to debounce.
 * @param delay - The debounce delay in milliseconds (default 300ms).
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}