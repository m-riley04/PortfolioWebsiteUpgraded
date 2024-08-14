import { ReactElement } from "react";
import WindowTypeEnum from "../enums/WindowTypeEnum";

export default interface IWindow {
    id: number;
    title?: string;
    icon_uri?: string;
    element: ReactElement;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    onClose?: (i: number) => void;
    type?: WindowTypeEnum;
}