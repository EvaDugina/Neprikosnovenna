import { useEffect, useRef, useCallback } from 'react';

function useAudio(src, volume=null) {
    const audioRef = useRef(null);

    // Создаём и загружаем аудио при изменении src
    useEffect(() => {
        if (!src) return;

        const audio = new Audio(src);
        audio.load();
        audioRef.current = audio;

        if (volume) audioRef.current.volume = volume;

        // Очистка при размонтировании или смене src
        return () => {
            audio.pause();
            audio.src = '';
            audioRef.current = null;
        };
    }, [src, volume]);

    const play = useCallback(() => {
        audioRef.current?.play().catch(console.error);
    }, []);

    const pause = useCallback(() => {
        audioRef.current?.pause();
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, []);

    return { play, pause, stop };
}

export default useAudio;