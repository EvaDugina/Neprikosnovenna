import { useCallback, useEffect, useRef } from 'react';

function useSoundEffect(src, volume = 1) {
    const audioContextRef = useRef(null);
    const gainNodeRef = useRef(null);
    const bufferRef = useRef(null);

    useEffect(() => {
        // Создаём контекст и узел громкости
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContextClass();
        const gainNode = context.createGain();
        gainNode.gain.value = volume;
        gainNode.connect(context.destination);

        audioContextRef.current = context;
        gainNodeRef.current = gainNode;

        // Загружаем и декодируем аудио
        fetch(src)
            .then(res => res.arrayBuffer())
            .then(data => context.decodeAudioData(data))
            .then(buffer => { bufferRef.current = buffer; })
            .catch(err => console.error('Ошибка загрузки звука:', err));

        return () => {
            context.close(); // освобождаем ресурсы при размонтировании
        };
    }, [src, volume]); // volume добавлен, чтобы при изменении громкости обновить узел

    const play = useCallback(() => {
        const context = audioContextRef.current;
        const gainNode = gainNodeRef.current;
        const buffer = bufferRef.current;

        if (!context || context.state === 'closed'  || !gainNode || !buffer) return;

        const playSound = () => {
            const source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(gainNode); // подключаем к узлу громкости
            source.start();
        };

        // Возобновляем контекст, если он заблокирован (требуется жест пользователя)
        if (context.state === 'suspended') {
            context.resume().then(playSound);
        } else {
            playSound();
        }
    }, []);

    return { play };
}

export default useSoundEffect;