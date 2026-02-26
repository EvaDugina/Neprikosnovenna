import "./Background.css";
import {forwardRef, useCallback, useImperativeHandle, useState} from "react";

const Background = forwardRef((props, ref) => {
    const {id = "", classes = "bg-white d-none", zIndex} = props

    const [isHidden, setIsHidden] = useState(false);
    const hide = useCallback(() => {
        setIsHidden(true);
    }, []);

    const show = useCallback(() => {
        setIsHidden(false);
    }, []);

    useImperativeHandle(ref, () => ({
        hide, show
    }));

    return <div
        id={id} className={`background ${classes} z-${zIndex}`}
        style={{
            display: isHidden ? "none" : "block",
        }}></div>;
});

export default Background;
