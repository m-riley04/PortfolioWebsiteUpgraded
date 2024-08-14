import Draggable from "react-draggable";
import "../Window/Window.scss"
import React from "react";
import WindowControls from "./WindowControls/WindowControls";
import IWindow from "../../interfaces/IWindow";
import WindowTypeEnum from "../../enums/WindowTypeEnum";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 500;

function Window(props: IWindow) {
    const nodeRef = React.useRef(null)
    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x: props.x ?? 0, y: props.y ?? 0 }}
            handle=".handle"
        >
            <div
                className={`window ${props.type === WindowTypeEnum.DIALOG ? "dialog" : "window"}`}
                style={{ width: `${props.width ?? DEFAULT_WIDTH}px`, height: `${props.height ?? DEFAULT_HEIGHT}px` }}
                ref={nodeRef}
            >
                <WindowControls
                    title={props.title ?? "Window Title"}
                    icon_uri={props.icon_uri ?? "icons/msg_error.png"}
                    hasClose={true}
                    hasMinimize={true}
                    hasMaximize={true}
                    hasMenuBar={props.type === WindowTypeEnum.EXPLORER}
                    className="handle"
                    onClose={() => props.onClose?.(props.id)} />
                <div className="body">
                    {props.element}
                </div>
            </div>
        </Draggable>
    );
}

export default Window;