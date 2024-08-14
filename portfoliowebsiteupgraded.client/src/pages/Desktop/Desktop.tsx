import { useEffect, useState } from "react";
import Shortcut from "../../components/Shortcut/Shortcut";
import IShortcut from "../../interfaces/IShortcut";
import "../Desktop/Desktop.scss";
import IWindow from "../../interfaces/IWindow";
import Window from "../../components/Window/Window";
import Taskbar from "../../components/Taskbar/Taskbar";

const X_PADDING = 20;

function Desktop(props: { shortcuts?: IShortcut[] }) {
    const [windows, setWindows] = useState<IWindow[]>([]);

    useEffect(() => {

    }, [windows])

    function addWindow(window?: IWindow) {
        if (window) {
            // Check if the window is already opened
            if (windows.some((_) => _.id === window.id)) {
                console.log("Window is already open!");
                return;
            }

            setWindows([...windows, window]);
            console.log("Window added");
        }
    }

    function removeWindowByKey(id: number) {
        setWindows(windows.filter((window) => window.id !== id));
        console.log(`Window '${id}' removed`);
    }

    return (
        <div className="monitor">
            <div className="desktop">
                { // Create shortcuts
                    props.shortcuts?.map((shortcut, i) => {
                        const window: IWindow | undefined = shortcut.window;

                        // Check inherited values
                        if (window) {
                            window.title = (window.title ?? shortcut.name) ?? "Window Title";
                            window.icon_uri = (window.icon_uri ?? shortcut.image_uri) ?? "vite.svg";
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