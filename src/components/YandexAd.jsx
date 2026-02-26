// YandexAd.jsx
import "./YandexAd.css"

import React, { useEffect, useRef } from 'react';

const YandexAd = ({ blockId, src, className = '', zIndex }) => {
    const adRef = useRef(null);
    const isDev = import.meta.env.DEV; // Vite определяет режим разработки

    useEffect(() => {
        // В разработке или без blockId – ничего не загружаем
        if (isDev || !blockId) {
            return;
        }

        // Инициализируем очередь колбэков Яндекса
        window.yaContextCb = window.yaContextCb || [];

        const renderAd = () => {
            if (adRef.current && !adRef.current.hasAttribute('data-ya-rendered')) {
                window.yaContextCb.push(() => {
                    if (window.Ya?.Context?.AdvManager) {
                        window.Ya.Context.AdvManager.render({
                            blockId: blockId,
                            renderTo: adRef.current.id,
                        });
                    } else {
                        console.error('Yandex Ads script not loaded or Ya object is missing');
                    }
                });
                adRef.current.setAttribute('data-ya-rendered', 'true');
            }
        };

        const scriptSrc = 'https://yandex.ru/ads/system/context.js';
        if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            script.onload = renderAd;
            script.onerror = () => console.error('Failed to load Yandex Ads script');
            document.head.appendChild(script);
        } else {
            renderAd();
        }

        return () => {
            if (adRef.current) {
                adRef.current.removeAttribute('data-ya-rendered');
            }
        };
    }, [blockId, isDev]);

    // Генерируем ID контейнера (для продакшена – на основе blockId)
    const containerId = blockId
        ? `yandex_rtb_${blockId.replace(/\W/g, '-')}`
        : 'yandex-ad-placeholder';

    // Режим разработки или отсутствие blockId – показываем заглушку
    if (isDev || !blockId) {
        return (
            <div
                id={containerId}
                ref={adRef}
                className={`ad-container ${className} z-${zIndex}`}
            >
                <img
                    className={`ad-container__image`}
                    src={src}
                    alt="реклама"
                />
            </div>
        );
    }

    // Продакшн-режим – реальный рекламный блок
    return (
        <div
            id={containerId}
            ref={adRef}
            className={`ad-container ${className} z-${zIndex}`}
            style={{ minWidth: '300px', minHeight: '250px' }}
        />
    );
};

export default YandexAd;