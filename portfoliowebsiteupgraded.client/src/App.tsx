import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from './pages/Desktop/Desktop.tsx';
import IShortcut from './interfaces/IShortcut.ts';
import { WindowProvider } from './contexts/WindowContext/WindowContext.tsx';
import { ApolloProvider } from '@apollo/client';
import { client } from './client.ts';
import WINDOW_MASTER_LIST from './windows/WindowMasterList.tsx';
import DesktopWrapper from './pages/Desktop/DesktopWrapper.tsx';

const shortcuts: IShortcut[] = [
    {
        name: "Projects",
        image_uri: "icons/directory_open.png",
        window: WINDOW_MASTER_LIST.get("projects")
    },
    {
        name: "About Me",
        image_uri: "icons/users.png",
        window: WINDOW_MASTER_LIST.get("about-me")
    },
    {
        name: "readme.txt",
        image_uri: "icons/notepad-2.png",
        window: WINDOW_MASTER_LIST.get("read-me")
    },
    {
        name: "Recycle Bin",
        image_uri: "icons/recycle_bin_empty.png",
        window: WINDOW_MASTER_LIST.get("recycle-bin")
    }
]

function App() {

    return (
        <ApolloProvider client={client}>
            <WindowProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<Desktop shortcuts={shortcuts} initialWindows={[WINDOW_MASTER_LIST.get("read-me")!]} />} />
                        <Route
                            path="/:windowName"
                            element={<DesktopWrapper shortcuts={shortcuts} defaultWindow={WINDOW_MASTER_LIST.get("error")!} />}/>
                        <Route
                            path="/projects/:projectName"
                            element={<Desktop shortcuts={shortcuts} />} />
                    </Routes>
                </BrowserRouter>
            </WindowProvider>
        </ApolloProvider>
    );
}

export default App;
