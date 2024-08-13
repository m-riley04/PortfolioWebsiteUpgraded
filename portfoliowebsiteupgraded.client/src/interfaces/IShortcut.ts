import { MouseEventHandler } from "react";
import IWindow from "./IWindow";

export default interface IShortcut {
    name: string;
    image_uri: string;
    window?: IWindow;
    x?: number;
    y?: number;
    onOpen?: MouseEventHandler<HTMLDivElement>;
}