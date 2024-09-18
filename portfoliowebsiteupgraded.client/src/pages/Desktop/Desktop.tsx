import Shortcut from "../../components/Shortcut/Shortcut";
import IShortcut from "../../interfaces/IShortcut";
import "../Desktop/Desktop.scss";
import IWindow from "../../interfaces/IWindow";
import Window from "../../components/Window/Window";
import Taskbar from "../../components/Taskbar/Taskbar";
import { useWindowManager } from "../../contexts/WindowContext/WindowContext";
import { FunctionComponent, useEffect } from "react";

const X_PADDING = 20;

interface IDesktop {
    shortcuts?: IShortcut[],
    initialWindows?: IWindow[]
}

const Desktop: FunctionComponent<IDesktop> = ({
    shortcuts,
    initialWindows = []
}) => {
    const { windows, addWindow, removeWindowByKey } = useWindowManager();

    useEffect(() => {
        // Add the initial windows
        initialWindows.forEach((w) => addWindow(w));
    }, []);

    return (
        <div className="monitor">
            <div className="desktop">
                { // Create shortcuts
                    shortcuts?.map((shortcut, i) => {
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