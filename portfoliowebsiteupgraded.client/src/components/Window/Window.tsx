import React, { FunctionComponent, useEffect } from "react";
import Draggable from "react-draggable";
import "../Window/Window.scss";
import WindowHandle from "../Window/WindowHandle/WindowHandle";
import IWindow from "../../interfaces/IWindow";
import WindowTypeEnum from "../../enums/WindowTypeEnum";
import WindowMenubar from "./WindowMenubar/WindowMenubar";
import { useWindowManager } from "../../contexts/WindowContext/WindowContext";

const Window: FunctionComponent<IWindow> = ({
    id,
    title = "Window Title",
    element = <></>,
    width_vw = 80,
    height_vh = 60,
    hasBody = true,
    hasHandle = true,
    type = WindowTypeEnum.DIALOG,
    x = 0,
    y = 0,
    z = 0,
    icon_uri = "icons/msg_error.png",
    onClose,
    className,
    resizable = true
}) => {
    const nodeRef = React.useRef(null);
    const { bringToFront } = useWindowManager();

    useEffect(() => {
        // Bring the window to the front when it is first rendered
        bringToFront(id);
    }, []);

    const handle = hasHandle ? (
        <WindowHandle
            title={title}
            icon_uri={icon_uri}
            hasClose={true}
            hasMinimize={true}
            hasMaximize={true}
            className="handle"
            onClose={() => onClose?.(id)}
        />
    ) : <></>;

    const menuBar = type === WindowTypeEnum.EXPLORER ? <WindowMenubar /> : <></>;

    const body = hasBody ? (
        <div className={`body ${type === WindowTypeEnum.DIALOG ? "dialog-body" : ""} ${className}`}>{element}</div>
    ) : <></>;

    // Bring the window to the front on click or drag
    const handleFocus = () => {
        bringToFront(id);
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x, y }}
            handle=".handle"
            onMouseDown={handleFocus}
            bounds="parent"
        >
            <div
                className="window"
                style={{ width: `${width_vw}vw`, height: `${height_vh}vh`, position: 'absolute', zIndex: z, resize: resizable ? "both" : "none"}}
                ref={nodeRef}
                onMouseDown={handleFocus}  // Brings to front on mouse down
            >
                {handle}
                {menuBar}
                {body}
            </div>
        </Draggable>
    );
};

export default Window;
