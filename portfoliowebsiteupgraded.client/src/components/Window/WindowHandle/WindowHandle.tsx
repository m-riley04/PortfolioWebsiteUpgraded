import { MouseEventHandler } from "react";

interface IWindowHandle {
    title: string;
    icon_uri: string;
    hasClose?: boolean;
    hasMinimize?: boolean;
    hasMaximize?: boolean;
    className?: string;
    onClose?: () => void;
    onMinimize?: MouseEventHandler<HTMLButtonElement>;
    onMaximize?: MouseEventHandler<HTMLButtonElement>;
}

function WindowHandle(props: IWindowHandle) {

    return (
        <div>
            <div className={`window-controls ${props.className ?? ""}`}>
                <div className="title-container">
                    <img src={props.icon_uri}></img>
                    <p>{props.title}</p>
                </div>
                <div className="button-container">
                    {props.hasMinimize ? <button className="minimize-button" onClick={props.onMinimize}>-</button> : <></>}
                    {props.hasMaximize ? <button className="maximize-button" onClick={props.onMaximize}>O</button> : <></>}
                    {props.hasClose ? <button className="close-button" onClick={props.onClose}>X</button> : <></>}
                </div>
            </div>
        </div>
    );
}

export default WindowHandle;