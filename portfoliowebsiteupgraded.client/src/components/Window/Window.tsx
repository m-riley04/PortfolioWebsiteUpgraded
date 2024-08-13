import Draggable from "react-draggable";
import "../Window/Window.scss"
import React from "react";
import WindowControls from "./WindowControls/WindowControls";
import IWindow from "../../interfaces/IWindow";

function Window(props: IWindow) {
    const nodeRef = React.useRef(null)
    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x: props.x ?? 0, y: props.y ?? 0 }}
            handle=".handle"
            onStart={() => console.log(props.id)}
        >
            <div className="window" ref={nodeRef}>
                <WindowControls title={props.title} hasClose={true} className="handle" onClose={() => props.onClose?.(props.id)} />
                <div className="body">
                    {props.element}
                </div>
            </div>
        </Draggable>
    );
}

export default Window;