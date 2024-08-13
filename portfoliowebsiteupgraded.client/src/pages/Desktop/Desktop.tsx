import { useEffect, useState } from "react";
import Shortcut from "../../components/Shortcut/Shortcut";
import IShortcut from "../../interfaces/IShortcut";
import "../Desktop/Desktop.scss";
import IWindow from "../../interfaces/IWindow";
import Window from "../../components/Window/Window";

let windowIdCounter = 0;
const X_PADDING = 50;

function Desktop(props: { shortcuts?: IShortcut[] }) {
    const [windows, setWindows] = useState<IWindow[]>([]);

    useEffect(() => {

    }, [windows])

    function getUniqueWindowId(): number {
        return ++windowIdCounter;
    }

    function addWindow(window?: IWindow) {
        if (window) {
            const newWindow = { ...window, id: getUniqueWindowId() };
            setWindows([...windows, newWindow]);
            console.log("Window added");
        }
    }

    function removeWindowByKey(id: number) {
        setWindows(windows.filter((window) => window.id !== id));
        console.log(`Window '${id}' removed`);
    }

    return (
        <div className="desktop">
            { // Create shortcuts
                props.shortcuts?.map((shortcut, i) => {
                    const window: IWindow | undefined = shortcut.window;

                    return <Shortcut key={i}
                        name={shortcut.name}
                        image_uri={shortcut.image_uri}
                        window={window}
                        x={X_PADDING * i}
                        y={0}
                        onOpen={() => addWindow(window)}/>
                }
                ) ?? <Shortcut name="Default" image_uri="vite.svg" x={0} y={0} />
            }

            { // Create windows
                windows.map((window) => {
                    return <Window
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        element={window.element}
                        onClose={() => removeWindowByKey(window.id)}
                        x={window.x}
                        y={window.y}/>;
                })
            }
        </div>
    );
}

export default Desktop;