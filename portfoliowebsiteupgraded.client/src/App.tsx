import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Project from './windows/Projects/Projects.tsx';
import Desktop from './pages/Desktop/Desktop.tsx';
import IShortcut from './interfaces/IShortcut.ts';
import AboutMe from './windows/AboutMe/AboutMe.tsx';
import WindowEnum from './enums/WindowEnum.ts';

const shortcuts: IShortcut[] = [
    { name: "Projects", image_uri: "directory_open.png", window: { id: WindowEnum.PROJECTS, element: <Project/>, x: 0, y: 0 } },
    { name: "About Me", image_uri: "users.png", window: { id: WindowEnum.ABOUT_ME, element: <AboutMe/>, x: 0, y: 0 } },
    { name: "Recycle Bin", image_uri: "recycle_bin_empty.png"}
]

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Desktop shortcuts={shortcuts}/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;