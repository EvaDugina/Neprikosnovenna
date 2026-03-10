import React, {forwardRef, useCallback, useImperativeHandle, useState, memo} from "react";
import styles from "./Flash.module.css";
import {FlashType, StaticData} from "./FlashSettings.js";

/**
 * Компонент вспышки (одна картинка или пустой фон). Управление через ref.flash().
 * @param {Object} props
 * @param {number} [props.type]
 * @param {number} [props.zIndex]
 * @param {number} [props.duration]
 */
const Flash = forwardRef((props, ref) => {
    const {type = FlashType.PORTRAIT_NEGATIVE, zIndex, duration} = props;

    const [isHidden, setIsHidden] = useState(true);
    const [isAnimate, setIsAnimate] = useState(false);

    const flash = useCallback(async () => {
        setIsHidden(false);
        setIsAnimate(true);

        await new Promise((resolve) => setTimeout(resolve, duration));

        setIsAnimate(false);
        setIsHidden(true);
    }, [duration]);

    useImperativeHandle(ref, () => ({flash}));

    const containerClass = [styles.flash__container, isAnimate && styles["flash__container--animation"], isHidden && styles["flash__container--hidden"], "ignore-cursor", `z-${zIndex}`,]
        .filter(Boolean)
        .join(" ");

    if (type === FlashType.NEGATIVE || type === FlashType.PORTRAIT_NEGATIVE) {
        const position = type === FlashType.NEGATIVE ? "fixed" : "absolute";
        const blendMode = type === FlashType.NEGATIVE ? styles["flash__container--blend-color-dodge"] : styles["flash__container--blend-exclusion"];
        const style = type === FlashType.NEGATIVE ? styles["flash__negative"] : styles["flash__portrait-negative"];
        return (<div
                id={`FlashContainer${type}`}
                className={`${containerClass} ${blendMode} not-allowed`}
                style={{position: position}}
            >
                <div
                    id={`Flash${type}`}
                    className={`${styles.flash__container} ${style} not-allowed`}
                />
            </div>);
    }

    const imageModifier = type === FlashType.FRONT ? styles["flash__image--type1"] : type === FlashType.VZGLAD ? styles["flash__image--type-vzglad"] : styles["flash__image--type2"];

    return (<div
            id={`FlashContainer${type}`}
            className={`${containerClass} not-allowed`}>
            <img
                id={`Flash${type}`}
                className={`${styles.flash__image} ${imageModifier} not-allowed`}
                src={StaticData[type].src}
                alt="ВСПЫШКА"
            />
        </div>);
});

Flash.displayName = "Flash";

export default memo(Flash);
