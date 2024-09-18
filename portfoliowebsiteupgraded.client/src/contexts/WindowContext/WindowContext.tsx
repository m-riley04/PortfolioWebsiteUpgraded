import React, { createContext, useContext, useState } from 'react';
import IWindow from "../../interfaces/IWindow";

// Create the context
const WindowContext = createContext<{
    windows: IWindow[],
    addWindow: (window: IWindow) => void,
    bringToFront: (id: number) => void,
    removeWindowByKey: (id: number) => void,
    removeTopWindow: () => void,
    getWindowIdByTitle: (title: string) => number,
    minimizeWindowById: (id: number) => void
} | undefined>(undefined);

// Provide the context
let windowCounter = 0;
export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [windows, setWindows] = useState<IWindow[]>([]);
    const [highestZIndex, setHighestZIndex] = useState(1);

    const getWindowIdByTitle = (title: string) => {
        const windowId: number = windows.find(w => w.title === title)?.id ?? 0;
        return windowId;
    }

    const addWindow = (window: IWindow) => {
        if (windows.some((w) => w.id === window.id)) {
            console.log('Window is already open!');
            return;
        }
        window.id = ++windowCounter;
        window.z = highestZIndex;
        setHighestZIndex(highestZIndex + 1);
        setWindows([...windows, window]);
    };

    const bringToFront = (id: number) => {
        const windowToBringToFront = windows.find(w => w.id === id);
        if (windowToBringToFront) {
            setWindows(windows.map(w =>
                w.id === id
                    ? { ...w, z: highestZIndex, hidden: false }
                    : w
            ));
            setHighestZIndex(highestZIndex + 1);
        }
    };

    const minimizeWindowById = (id: number) => {
        setWindows((prevWindows) =>
            prevWindows.map(w =>
                w.id === id
                    ? { ...w, hidden: true }  // Set hidden to true when minimizing
                    : w
            )
        );
    }

    const removeWindowByKey = (id: number) => {
        setWindows(windows.filter((window) => window.id !== id));
        console.log(`Window '${id}' removed`);
    };

    const removeTopWindow = () => {
        const maxZValue: number = Math.max(...windows.map<number>((window) => window.z ?? 0));
        const topWindowId: number = windows.find((window?) => window?.z === maxZValue)?.id ?? 0;
        removeWindowByKey(topWindowId);
    }

    return (
        <WindowContext.Provider value={{ windows, getWindowIdByTitle, addWindow, bringToFront, minimizeWindowById, removeWindowByKey, removeTopWindow }}>
            {children}
        </WindowContext.Provider>
    );
};

// Create a custom hook to use the context
export const useWindowManager = () => {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error('useWindowManager must be used within a WindowProvider');
    }
    return context;
};
