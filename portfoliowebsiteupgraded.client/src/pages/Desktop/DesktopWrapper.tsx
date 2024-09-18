import { useParams } from 'react-router-dom';
import WINDOW_MASTER_LIST from '../../windows/WindowMasterList.tsx';
import IShortcut from '../../interfaces/IShortcut.ts';
import IWindow from '../../interfaces/IWindow.ts';
import Desktop from './Desktop.tsx';

interface DesktopWrapperProps {
    shortcuts: IShortcut[];
    defaultWindow: IWindow;
}

const DesktopWrapper: React.FC<DesktopWrapperProps> = ({
    shortcuts,
    defaultWindow
}) => {
    const { windowName } = useParams<{ windowName: string }>();

    // Function to get the initial window based on the URL parameter
    const getInitialWindows = () => {
        const windowFromParam = WINDOW_MASTER_LIST.get(windowName || "");
        if (windowFromParam) {
            return [windowFromParam];
        }
        return [defaultWindow];  // Default window if no parameter or invalid window name
    };

    return <Desktop shortcuts={shortcuts} initialWindows={getInitialWindows()} />;
};

export default DesktopWrapper;