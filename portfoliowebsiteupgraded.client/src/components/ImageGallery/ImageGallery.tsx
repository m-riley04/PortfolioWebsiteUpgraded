import { FunctionComponent, useState } from "react";
import "../ImageGallery/ImageGallery.scss";

interface IImageGallery {
    image_uris: string[];
}

const ImageGallery: FunctionComponent<IImageGallery> = ({
    image_uris = []
}) => {
    const [imageIndex, setImageIndex] = useState(0);

    function decrementImageIndex() {
        const nextIndex = (imageIndex - 1) < 0 ? image_uris.length-1 : imageIndex - 1;
        setImageIndex(nextIndex);
    }

    function incrementImageIndex() {
        const nextIndex = (imageIndex + 1) > image_uris.length-1 ? 0 : imageIndex + 1;
        setImageIndex(nextIndex);
    }

    if (image_uris.length < 1) return (
        <div className="image-gallery">
            <p>No images displayed.</p>
        </div>
    );

    return (
        <div className="image-gallery">
            <button onClick={decrementImageIndex}>Left</button>
            <img src={image_uris[imageIndex]} />
            <button onClick={incrementImageIndex}>Right</button>
        </div>
    );
}

export default ImageGallery;