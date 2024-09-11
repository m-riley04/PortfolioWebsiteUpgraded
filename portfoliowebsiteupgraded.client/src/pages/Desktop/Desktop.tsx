import Shortcut from "../../components/Shortcut/Shortcut";
import IShortcut from "../../interfaces/IShortcut";
import "../Desktop/Desktop.scss";
import IWindow from "../../interfaces/IWindow";
import Window from "../../components/Window/Window";
import Taskbar from "../../components/Taskbar/Taskbar";
import { useWindowManager } from "../../contexts/WindowContext/WindowContext";
import { useEffect } from "react";
import Notepad from "../../windows/Notepad/Notepad";
import WindowTypeEnum from "../../enums/WindowTypeEnum";

const X_PADDING = 20;

function Desktop(props: { shortcuts?: IShortcut[] }) {
    const { windows, addWindow, removeWindowByKey } = useWindowManager();

    // Getting Started Notepad Window
    const notepadWindow: IWindow = {
        id: 0,
        title: "Notepad",
        icon_uri: "icons/notepad-2.png",
        element: <Notepad text={`Welcome to my website! You can navigate this page just as you would a Windows operating system; specifically, Windows 98.`} />,
        type: WindowTypeEnum.EXPLORER,
        width_vw: 40,
        height_vh: 50,
        x: 60,
        y: 60
    }

    useEffect(() => {
        // Add the notepad window as the first
        addWindow(notepadWindow);
    }, []);

    return (
        <div className="monitor">
            <div className="desktop">
                { // Create shortcuts
                    props.shortcuts?.map((shortcut, i) => {
                        const window: IWindow = shortcut.window ?? { id: 9999 };

                        // Check inherited values
                        if (window) {
                            window.title = (window.title ?? shortcut.name) ?? "Window Title";
                            window.icon_uri = (window.icon_uri ?? shortcut.image_uri) ?? "vite.svg";
                            window.x = window.x ?? 100 + i * X_PADDING; // Set dynamic x
                            window.y = window.y ?? 100 + i * X_PADDING; // Set dynamic y
                        }

                        return <Shortcut {...shortcut} key={i} x={X_PADDING * i} onOpen={() => addWindow(window)}/>
                    }
                    ) ?? <Shortcut name="Default" image_uri="vite.svg" x={0} y={0} />
                }

                { // Create windows
                    windows.map((window) => {
                        return <Window {...window} key={window.id} onClose={() => removeWindowByKey(window.id)} />;
                    })
                }

                
            </div>
            <Taskbar windows={windows} />
        </div>
    );
}

export default Desktop;