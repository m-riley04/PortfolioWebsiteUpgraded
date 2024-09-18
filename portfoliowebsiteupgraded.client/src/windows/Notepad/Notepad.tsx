import { FunctionComponent } from "react";
import "../Notepad/Notepad.scss";

interface INotepad {
    text: string
}

const Notepad: FunctionComponent<INotepad> = ({
    text = ""
}) => {
    return (
        <>
            <p className="notepad-body" suppressContentEditableWarning={true} contentEditable>{text}</p>
        </>
    );
}

export default Notepad;