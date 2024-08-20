import { ReactElement } from "react";
import WindowTypeEnum from "../enums/WindowTypeEnum";
import ButtonOption from "../models/ButtonOption";

export default interface IWindow {
    id: number;
    type?: WindowTypeEnum;
    title?: string;
    icon_uri?: string;
    element?: ReactElement;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    z?: number;
    onClose?: (i: number) => void;
    hasBody?: boolean;
    hasHandle?: boolean;
    hasButtons?: boolean;
    buttons?: ButtonOption[];
    className?: string;
}