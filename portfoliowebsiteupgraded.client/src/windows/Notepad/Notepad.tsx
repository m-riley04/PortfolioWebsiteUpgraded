import { FunctionComponent } from "react";
import "../Notepad/Notepad.scss";

interface INotepad {
    text: string
}

const Notepad: FunctionComponent<INotepad> = ({
    text = ""
}) => {
    return (
        <div className="notepad-body">
            <div contentEditable><p contentEditable>{text}</p></div>
        </div>
    );
}

export default Notepad;