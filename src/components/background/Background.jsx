import "./Background.css";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import styles from "./Background.module.css";

/**
 * Фоновый слой с возможностью скрывать/показывать через ref.
 * @param {Object} props
 * @param {string} [props.id]
 * @param {string} [props.variant] - 'white' | 'blue'
 * @param {string} [props.extraClass] - дополнительные глобальные классы (например d-none)
 * @param {number} [props.zIndex]
 */
const Background = forwardRef((props, ref) => {
    const { id = "", variant = "white", extraClass = "", zIndex } = props;

    const [isHidden, setIsHidden] = useState(false);
    const hide = useCallback(() => setIsHidden(true), []);
    const show = useCallback(() => setIsHidden(false), []);

    useImperativeHandle(ref, () => ({ hide, show }));



    const modifierClass = styles[`background--${variant}`];

    const className = [
        styles.background,
        modifierClass,
        extraClass,
        `z-${zIndex}`,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            id={id}
            key={`${id}`}
            className={className}
            style={{display: isHidden ? "none" : "block",}}
        />
    );
});

Background.displayName = "Background";

export default Background;
