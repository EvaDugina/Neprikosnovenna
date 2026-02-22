import {useCallback,} from "react"

export function useCursorEvents(handleLeftClickDownRef, handleLeftClickUpRef) {

    const onPointerDown = useCallback((event) => {
        event.preventDefault(); // Для сенсоров

        if (event.button === 0) {
            handleLeftClickDownRef.current?.(event)
        }
    }, [handleLeftClickDownRef])

    const onPointerUp = useCallback((event) => {
        event.preventDefault(); // Для сенсоров

        if (event.button === 0) {
            handleLeftClickUpRef.current?.(event)
        }
    }, [handleLeftClickUpRef])

    //
    // PUBLIC
    //

    const enableCursor = useCallback(() => {
        window.addEventListener("pointerdown", onPointerDown)
        window.addEventListener("pointerup", onPointerUp)
    }, [onPointerDown, onPointerUp])

    const disableCursor = useCallback(() => {
        window.removeEventListener("pointerdown", onPointerDown)
        window.removeEventListener("pointerup", onPointerUp)
    }, [onPointerDown, onPointerUp])

    return {enableCursor, disableCursor}
}

export default useCursorEvents
