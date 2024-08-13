import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Project from './pages/Projects.tsx';
import Desktop from './pages/Desktop/Desktop.tsx';
import IShortcut from './interfaces/IShortcut.ts';

const shortcuts: IShortcut[] = [
    { name: "Projects", image_uri: "vite.svg", window: { id: 0, title: "Projects", element: <Project></Project>, x: 0, y: 0 } },
    { name: "About Me", image_uri: "vite.svg"},
    { name: "Recycle Bin", image_uri: "vite.svg"}
]

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Desktop shortcuts={shortcuts}/>}></Route>
                <Route path="projects" element={<Project/>}></Route>
                <Route path="about-me" element={<></>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;