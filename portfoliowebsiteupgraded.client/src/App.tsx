import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from './pages/Desktop/Desktop.tsx';
import IShortcut from './interfaces/IShortcut.ts';
import AboutMe from './windows/AboutMe/AboutMe.tsx';
import WindowEnum from './enums/WindowEnum.ts';
import Projects from './windows/Projects/Projects.tsx';
import MessageBox from './windows/MessageBox/MessageBox.tsx';
import WindowTypeEnum from './enums/WindowTypeEnum.ts';
import { WindowProvider } from './contexts/WindowContext/WindowContext.tsx';
import { ApolloProvider } from '@apollo/client';
import { client } from './client.ts';

const shortcuts: IShortcut[] = [
    {
        name: "Projects",
        image_uri: "icons/directory_open.png",
        window: {
            id: WindowEnum.PROJECTS,
            element: <Projects />,
            type: WindowTypeEnum.EXPLORER,
            width_vw: 40,
            height_vh: 50
        }
    },
    {
        name: "About Me",
        image_uri: "icons/users.png",
        window: {
            id: WindowEnum.ABOUT_ME,
            element: <AboutMe />,
            type: WindowTypeEnum.DEFAULT,
            width_vw: 50,
            height_vh: 50
        }
    },
    {
        name: "Recycle Bin",
        image_uri: "icons/recycle_bin_empty.png",
        window: {
            id: 24,
            element: <MessageBox parentWindowTitle="Recycle Bin" icon={0} text="This is not implemented yet." />,
            type: WindowTypeEnum.DIALOG,
            width_vw: 5,
            height_vh: 5,
            hasButtons: true,
            resizable: false
        }
    }
]

function App() {
    return (
        <ApolloProvider client={client}>
            <WindowProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Desktop shortcuts={shortcuts}/>}></Route>
                    </Routes>
                </BrowserRouter>
            </WindowProvider>
        </ApolloProvider>
    );
}

export default App;