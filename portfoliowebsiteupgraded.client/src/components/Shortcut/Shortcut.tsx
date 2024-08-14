import Draggable from "react-draggable";
import "../Shortcut/Shortcut.scss";
import React from "react";
import IShortcut from "../../interfaces/IShortcut";

function Shortcut(props: IShortcut) {
    const nodeRef = React.useRef(null)

    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x: props.x ?? 0, y: props.y ?? 0 }}
            bounds="parent"
        >
            <div className="shortcut" ref={nodeRef} onDoubleClick={props.onOpen}>
                <img src={props.image_uri} draggable={false} />
                <p>{props.name}</p>
            </div>
        </Draggable>
    );
}

export default Shortcut;