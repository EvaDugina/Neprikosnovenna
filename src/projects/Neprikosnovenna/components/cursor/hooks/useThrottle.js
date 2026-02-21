import {useCallback, useEffect, useRef} from 'react';

const useThrottle = (callback, delay) => {
    const lastCallTime = useRef(0);
    const timeoutRef = useRef(null);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback((...args) => {
            if (delay <= 0) {
                callbackRef.current.apply(this, args);
                return;
            }

            const now = Date.now();
            const timeElapsed = now - lastCallTime.current;

            if (timeElapsed >= delay) {
                lastCallTime.current = now;
                callbackRef.current.apply(this, args);
            } else {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                    lastCallTime.current = Date.now();
                    callbackRef.current.apply(this, args);
                    timeoutRef.current = null;
                }, delay - timeElapsed);
            }
        }, [delay]
    );
};

export default useThrottle;