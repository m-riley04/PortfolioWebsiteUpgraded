import Draggable from "react-draggable";
import "../Window/Window.scss"
import React, { FunctionComponent } from "react";
import WindowHandle from "./WindowHandle/WindowHandle";
import IWindow from "../../interfaces/IWindow";
import WindowTypeEnum from "../../enums/WindowTypeEnum";
import WindowMenubar from "./WindowMenubar/WindowMenubar";

const Window: FunctionComponent<IWindow> = ({
    id,
    title = "Window Title",
    element = <></>,
    width = 800,
    height = 500,
    hasBody = true,
    hasHandle = true,
    hasButtons = false,
    buttons = [{ title: "Ok" }],
    type = WindowTypeEnum.DIALOG,
    x = 0,
    y = 0,
    icon_uri = "icons/msg_error.png",
    onClose,
}) => {
    const nodeRef = React.useRef(null);

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
        <div className={`body ${type === WindowTypeEnum.DIALOG ? "dialog-body" : ""}`}>{element}</div>
    ) : (
        <></>
    );

    const buttonsContainer = hasButtons ? (
        <div className="dialog-button-container">
            {buttons.map((option, i) => <button key={i} onClick={option.onClick}><u>{option.title.charAt(0)}</u>{option.title.substring(1)}</button>)}
        </div>
    ) : <></>;

    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x, y }}
            handle=".handle"
        >
            <div
                className="window"
                style={{ width: `${width}px`, height: `${height}px` }}
                ref={nodeRef}
            >
                {handle}
                {menuBar}
                {body}
                {buttonsContainer}
            </div>
        </Draggable>
    );
};

export default Window;