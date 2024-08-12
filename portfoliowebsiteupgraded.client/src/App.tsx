import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Project from './pages/Projects.tsx';
import Desktop from './pages/Desktop/Desktop.tsx';

interface ShortcutData {
    name: string;
    image_uri: string;
}

const shortcuts: ShortcutData[] = [
    { name: "Projects", image_uri: "projects.jpg" }
]

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Desktop shortcuts={shortcuts}/>}></Route>
                <Route path="projects" element={<Project/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;