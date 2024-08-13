import { ReactElement } from "react";

export default interface IWindow {
    title: string;
    element: ReactElement;
    x?: number;
    y?: number;
    onClose?: (i: number) => void;
    id: number;
}