import { ReactElement } from "react";

export default interface IWindow {
    id: number;
    title: string;
    icon_uri: string;
    element: ReactElement;
    x?: number;
    y?: number;
    onClose?: (i: number) => void;
}