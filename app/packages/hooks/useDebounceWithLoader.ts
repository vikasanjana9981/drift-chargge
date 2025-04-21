import { useState, useCallback } from 'react';

export const useDebounceWithLoader = (
    callback: (...args: any[]) => void,
    delay: number,
    setLoading: (state: boolean) => void
) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    return useCallback(
        (...args: any[]) => {
            setLoading(true);
            if (timer) clearTimeout(timer);
            const newTimer = setTimeout(() => {
                callback(...args);
                setLoading(false);
            }, delay);
            setTimer(newTimer);
        },
        [callback, delay, setLoading]
    );
};