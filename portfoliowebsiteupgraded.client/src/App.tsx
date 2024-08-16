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
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { client } from './client.ts';

const shortcuts: IShortcut[] = [
    {
        name: "Projects",
        image_uri: "icons/directory_open.png",
        window: {
            id: WindowEnum.PROJECTS,
            element: <Projects />,
            type: WindowTypeEnum.EXPLORER,
            width: 800,
            height: 500
        }
    },
    {
        name: "About Me",
        image_uri: "icons/users.png",
        window: {
            id: WindowEnum.ABOUT_ME,
            element: <AboutMe />,
            type: WindowTypeEnum.DEFAULT,
            width: 1200,
            height: 800
        }
    },
    {
        name: "Recycle Bin",
        image_uri: "icons/recycle_bin_empty.png",
        window: {
            id: 24,
            element: <MessageBox icon={0} text="This is not implemented yet." />,
            type: WindowTypeEnum.DIALOG,
            width: 300,
            height: 150,
            hasButtons: true
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