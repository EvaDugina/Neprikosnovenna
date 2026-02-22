import {useCallback, useRef} from "react"

export function useCursorMoveAnimation(updatePositionRef) {
    const animationIdRef = useRef(null)

    const animate = useCallback(() => {
        updatePositionRef.current?.(); // вызываем актуальную функцию обновления
    }, [updatePositionRef]);

    const startAnimation = useCallback(() => {
        if (animationIdRef.current) return
        animationIdRef.current = requestAnimationFrame(animate)
    }, [animate])

    const continueAnimation = useCallback(() => {
        // if (animationIdRef.current) return;
        animationIdRef.current = requestAnimationFrame(animate)
    }, [animate])

    const stopAnimation = useCallback(() => {
        if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current)
            animationIdRef.current = null
        }
    }, [])

    return {startAnimation, continueAnimation, stopAnimation}
}

export default useCursorMoveAnimation
