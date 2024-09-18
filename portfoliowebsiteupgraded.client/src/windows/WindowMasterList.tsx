import WindowEnum from "../enums/WindowEnum"
import WindowTypeEnum from "../enums/WindowTypeEnum"
import IWindow from "../interfaces/IWindow"
import AboutMe from "./AboutMe/AboutMe";
import MessageBox from "./MessageBox/MessageBox";
import Notepad from "./Notepad/Notepad";
import Projects from "./Projects/Projects";

const WINDOW_MASTER_LIST: Map<string, IWindow> = new Map<string, IWindow>([
    ["projects", {
        id: WindowEnum.PROJECTS,
        element: <Projects />,
        type: WindowTypeEnum.EXPLORER,
        width_vw: 40,
        height_vh: 50
    }],
    ["about-me", {
        id: WindowEnum.ABOUT_ME,
        element: <AboutMe />,
        type: WindowTypeEnum.DEFAULT,
        width_vw: 50,
        height_vh: 92
    }],
    ["recycle-bin", {
        id: 24,
        element: <MessageBox parentWindowTitle="Recycle Bin" icon = { 0} text="This is not implemented yet." />,
        type: WindowTypeEnum.DIALOG,
        width_vw: 5,
        height_vh: 5,
        hasButtons: true,
        resizable: false
    }],
    ["read-me", { // Getting Started Notepad Window
        id: 0,
        title: "Notepad",
        icon_uri: "icons/notepad-2.png",
        element: <Notepad text={`Welcome to my website! You can navigate this page just as you would a Windows operating system; specifically, Windows 98.`} />,
        type: WindowTypeEnum.EXPLORER,
        width_vw: 40,
        height_vh: 50,
        x: 60,
        y: 60
    }],
    ["error", {
        id: 24,
        title: "Error",
        element: <MessageBox parentWindowTitle="Unknown Window" icon = { 0} text="The window you attempted to open does not exist." />,
        type: WindowTypeEnum.DIALOG,
        width_vw: 5,
        height_vh: 5,
        hasButtons: true,
        resizable: false
    }],
]);

export default WINDOW_MASTER_LIST;