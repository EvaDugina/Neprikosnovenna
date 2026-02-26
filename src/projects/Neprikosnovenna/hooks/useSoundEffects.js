import { useCallback, useEffect, useRef, useState } from 'react';

function useSoundEffects(sources) {
    const audioContextRef = useRef(null);
    const buffersRef = useRef([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    // const queueRef = useRef([]);

    useEffect(() => {
        if (!sources || sources.length === 0) return;

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContextClass();
        audioContextRef.current = context;

        // queueRef.current = []

        const loadAll = async () => {
            try {
                const fetchPromises = sources.map(async (src) => {
                    // queueRef.current.push( {
                    //     index: index,
                    //     isPlayed: false
                    // });
                    const response = await fetch(src);
                    if (!response.ok) throw new Error(`HTTP ${response.status} для ${src}`);
                    const arrayBuffer = await response.arrayBuffer();
                    return await context.decodeAudioData(arrayBuffer);
                });

                buffersRef.current = await Promise.all(fetchPromises);
                setIsLoaded(true);
                setError(null);
            } catch (err) {
                console.error('Ошибка загрузки звуков:', err);
                setError(err.message);
            }
        };

        loadAll();

        return () => {
            context.close();
            audioContextRef.current = null;
        };
    }, [sources]);

    const play = useCallback((index = null) => {
        const context = audioContextRef.current;
        const buffers = buffersRef.current;

        if (!context || context.state === 'closed' || buffers.length === 0) return;

        // Если нужен случайный из неповторяющихся
        // let notPlayedSources = [];
        // if (index === null) {
        //     notPlayedSources = queueRef.current.filter(source => !source.isPlayed);
        //     if (notPlayedSources.length === 0) {
        //         for (let i = 0; i < queueRef.current.length; i++) {
        //             queueRef.current[i].isPlayed = false;
        //         }
        //         notPlayedSources = [...queueRef.current];
        //     }
        // }
        // const randomNumber = index === null ? Math.floor(Math.random() * notPlayedSources.length) : index;
        // const randomIndex = notPlayedSources[randomNumber].index;
        // queueRef.current[randomIndex].isPlayed = true;

        const randomIndex = index === null ? Math.floor(Math.random() * buffers.length) : index;
        const buffer = buffers[randomIndex];

        const playSound = () => {
            const source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(context.destination);
            source.start(); // всегда начинается с начала
        };

        if (context.state === 'suspended') {
            context.resume().then(playSound);
        } else {
            playSound();
        }
    }, []);

    return { play, isLoaded, error };
}

export default useSoundEffects;