import { FunctionComponent } from "react";
import "../WindowMenubar/WindowMenubar.scss";
import ButtonOption from "../../../models/ButtonOption";

interface IWindowMenubar {
    options?: ButtonOption[];
}

const DEFAULT_OPTIONS: ButtonOption[] = [{ title: "File" }, { title: "Edit" }, { title: "View" }, { title: "Help" }]

const WindowHandle: FunctionComponent<IWindowMenubar> = ({
    options = DEFAULT_OPTIONS
}) => {
    return (
        <div className="dropdowns">
            {options?.map((option, i) => 
                <button key={i} onClick={option.onClick}><u>{option.title.charAt(0)}</u>{option.title.substring(1)}</button>
            )}
        </div>
    );
}

export default WindowHandle;