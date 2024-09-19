import { FunctionComponent, useEffect, useState } from "react";
import "../MediaGallery/MediaGallery.scss";

enum MediaTypeEnum {
    OTHER,
    IMAGE,
    VIDEO,
    AUDIO
}

interface IImageGallery {
    uris: string[];
}

function getFileExtensionFromUri(uri: string): string {
    // Split the URI by the dot character
    const parts = uri.split('.');

    // The file type is the last part of the array
    return parts[parts.length - 1].replace("?raw=true", "").toLowerCase();
}

function isVideoType(extension: string): boolean {
    const videoTypes = ["mp4", "webm", "ogg", "avi", "mov", "wmv", "flv", "mkv"];
    return videoTypes.includes(extension);
}

function isImageType(extension: string): boolean {
    const imageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "tiff"];
    return imageTypes.includes(extension);
}

function isAudioType(extension: string): boolean {
    const audioTypes = ["mp3", "wav", "ogg", "m4a", "aac", "flac", "wma"];
    return audioTypes.includes(extension);
}

function getMediaType(extension: string): MediaTypeEnum {
    if (isImageType(extension)) {
        return MediaTypeEnum.IMAGE;
    } else if (isVideoType(extension)) {
        return MediaTypeEnum.VIDEO;
    } else if (isAudioType(extension)) {
        return MediaTypeEnum.AUDIO;
    } else {
        return MediaTypeEnum.OTHER;
    }
}

const MediaGallery: FunctionComponent<IImageGallery> = ({
    uris = []
}) => {
    const [index, setIndex] = useState(0);
    const [currentSrc, setCurrentSrc] = useState("vite.svg");
    const [mediaType, setMediaType] = useState(MediaTypeEnum.IMAGE);
    const [loading, setLoading] = useState(true);

    function decrementIndex() {
        const nextIndex = (index - 1) < 0 ? uris.length - 1 : index - 1;
        setIndex(nextIndex);
    }

    function incrementIndex() {
        const nextIndex = (index + 1) > uris.length - 1 ? 0 : index + 1;
        setIndex(nextIndex);
    }

    useEffect(() => {
        // Check for empty uris
        if (uris.length <= 0) {
            return;
        }

        setLoading(true);
        const fileExtension = getFileExtensionFromUri(uris[index]);
        const newMediaType = getMediaType(fileExtension);
        setMediaType(newMediaType);

        switch (newMediaType) {
            case (MediaTypeEnum.IMAGE):
            case (MediaTypeEnum.VIDEO):
            case (MediaTypeEnum.AUDIO):
                setCurrentSrc(uris[index]);
                setLoading(false);
                break;
            default:
                console.log(`Unsupported file type '${fileExtension}'`);
                setLoading(false);
                break;
        }
    }, [index, uris]);

    if (uris.length <= 0) return (
        <div className="image-gallery">
            <p>No media displayed.</p>
        </div>
    );

    return (
        <div className="image-gallery">
            <button onClick={decrementIndex}>&lt;</button>
            {mediaType === MediaTypeEnum.IMAGE ? <img
                src={currentSrc}
                alt="Media Gallery"
                style={{ opacity: loading ? 0.5 : 1 }}
                onError={() => {
                    console.log(`Failed to load the image '${uris[index]}'`);
                    setLoading(false);
                }}
            /> : <></>}
            {mediaType === MediaTypeEnum.VIDEO ? <video
                src={currentSrc}
                controls
                autoPlay
                muted
                style={{ opacity: loading ? 0.5 : 1 }}
                onError={() => {
                    console.log(`Failed to load the video '${uris[index]}'`);
                    setLoading(false);
                }}
            /> : <></>}
            {mediaType === MediaTypeEnum.AUDIO ? <audio
                src={currentSrc}
                controls
                onError={() => {
                    console.log(`Failed to load the audio '${uris[index]}'`);
                    setLoading(false);
                }}
            /> : <></> }
            <button onClick={incrementIndex}>&gt;</button>
        </div>
    );
}

export default MediaGallery;
