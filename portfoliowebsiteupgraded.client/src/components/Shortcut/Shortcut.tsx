import Draggable from "react-draggable";
import "../Shortcut/Shortcut.scss";
import React, { FunctionComponent } from "react";
import IShortcut from "../../interfaces/IShortcut";

const Shortcut: FunctionComponent<IShortcut> = ({
    name,
    image_uri,
    x,
    y,
    onOpen
}) => {
    const nodeRef = React.useRef(null)

    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x: x ?? 0, y: y ?? 0 }}
            bounds="parent"
        >
            <div
                className="shortcut"
                ref={nodeRef}
                onDoubleClick={onOpen}
                onTouchStart={onOpen}
            >
                <img src={image_uri} draggable={false} />
                <p>{name}</p>
            </div>
        </Draggable>
    );
}

export default Shortcut;