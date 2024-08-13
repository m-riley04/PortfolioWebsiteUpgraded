import { MouseEventHandler } from "react";

interface IWindowControls {
    title: string;
    hasClose?: boolean;
    hasMinimize?: boolean;
    hasMaximize?: boolean;
    className?: string;
    onClose?: () => void;
    onMinimize?: MouseEventHandler<HTMLButtonElement>;
    onMaximize?: MouseEventHandler<HTMLButtonElement>;
}

function WindowControls(props: IWindowControls) {

    return (
        <div className={`window-controls ${props.className ?? ""}`}>
            <p>{props.title}</p>
            {props.hasMinimize ? <button className="minimize-button" onClick={props.onMinimize}>Minimize</button> : <></> }
            {props.hasMaximize ? <button className="maximize-button" onClick={props.onMaximize}>Maximize</button> : <></> }
            {props.hasClose ? <button className="close-button" onClick={props.onClose}>Close</button> : <></>}
        </div>
    );
}

export default WindowControls;