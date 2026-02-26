import "./Portrait.scss";
import React, {forwardRef, useImperativeHandle, useRef,} from "react";
import useVideoController from "./hooks/useVideoController.js";

const VideoPortrait = forwardRef((props, ref) => {
    const {settings, zIndex} = props;

    const videoRef = useRef(null);
    const {show, hide, play, pause, stop, scrollToEnd, scrollToStart} = useVideoController(settings, videoRef);
    useImperativeHandle(ref, () => ({
        show, hide, play, pause, stop, scrollToEnd, scrollToStart
    }));

    return (<>
        <figure>
            <video
                id="Portrait"
                ref={videoRef}
                className={`portrait video not-allowed z-${zIndex+1}`}
                poster="/images/НЕПРИКОСНОВЕННА.png"
                muted
            >
                <source
                    src="/videos/ЛИЗА ПЛАЧЕТ (22 секунды).webm"
                    type="video/webm"
                />
                <source src="/videos/ЛИЗА ПЛАЧЕТ (22 секунды).mp4" type="video/mp4"/>
            </video>
            <img
                id="Portrait"
                className={`portrait image not-allowed z-${zIndex}`}
                src="/images/НЕПРИКОСНОВЕННА.png"
                alt="НЕПРИКОСНОВЕННА"
            />
        </figure>
    </>);
});

export default VideoPortrait;
