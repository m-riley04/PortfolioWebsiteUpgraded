import React, { createContext, useContext, useState } from 'react';
import IWindow from "../../interfaces/IWindow";

// Create the context
const WindowContext = createContext<{
    windows: IWindow[],
    addWindow: (window: IWindow) => void,
    removeWindowByKey: (id: number) => void
} | undefined>(undefined);

// Provide the context
let windowCounter = 0;
export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [windows, setWindows] = useState<IWindow[]>([]);
    

    const addWindow = (window: IWindow) => {
        if (windows.some((w) => w.id === window.id)) {
            console.log('Window is already open!');
            return;
        }
        window.id = ++windowCounter;
        setWindows([...windows, window]);
    };

    const removeWindowByKey = (id: number) => {
        setWindows(windows.filter((window) => window.id !== id));
        console.log(`Window '${id}' removed`);
    };

    return (
        <WindowContext.Provider value={{ windows, addWindow, removeWindowByKey }}>
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