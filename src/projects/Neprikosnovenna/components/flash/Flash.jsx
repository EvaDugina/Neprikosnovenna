import React, {forwardRef, useCallback, useImperativeHandle, useRef} from "react";
import "./Flash.css";
import {FlashType} from "./FlashSettingsHandler.js";

const StaticData = {
    [FlashType.DEFAULT]: {
        src: "",
    }, [FlashType.FRONT]: {
        src: "/images/01.jpg",
    }, [FlashType.BEHIND]: {
        src: "/images/02.jpg",
    },
};

const Flash = forwardRef((props, ref) => {
    const {type = FlashType.DEFAULT, zIndex, duration} = props;

    const containerRef = useRef(null);

    const flash = useCallback(async () => {

        containerRef.current.classList.remove("flash-animation");

        containerRef.current.classList.remove("d-none");
        containerRef.current.classList.add("flash-animation");

        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, duration);
        });

        containerRef.current.classList.remove("flash-animation");
        containerRef.current.classList.add("d-none");

    }, [duration])

    useImperativeHandle(ref, () => ({
        flash
    }));

    //
    //
    //

    if (type === FlashType.DEFAULT) {
        return (<div
            // key={crypto?.randomUUID() ?? Date.now().toString()}
            ref={containerRef}
            id={`FlashContainer${type}`}
            className={`flash-container flash-animation ignore-cursor blend-exclusion z-${zIndex} d-none`}
        >
            <div id="FlashBack" className="flash-container flash-back not-allowed"/>
        </div>);
    }

    return (<div
        ref={containerRef}
        id={`FlashContainer${type}`}
        className={`flash-container flash-animation ignore-cursor z-${zIndex} d-none`}
    >
        <img
            id={`Flash${type}`}
            className="flash not-allowed"
            src={StaticData[type].src}
            alt="ВСПЫШКА"
        />
    </div>);
});

export default Flash;
