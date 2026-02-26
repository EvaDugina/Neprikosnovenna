import "./Portrait.scss";

const ImagePortrait = ({zIndex}) => {
    return (<>
        <figure>
            <img
                id="Portrait"
                className={`portrait image not-allowed z-${zIndex}`}
                src="/images/НЕПРИКОСНОВЕННА.png"
                alt="НЕПРИКОСНОВЕННА"
            />
        </figure>
    </>);
};

export default ImagePortrait;
