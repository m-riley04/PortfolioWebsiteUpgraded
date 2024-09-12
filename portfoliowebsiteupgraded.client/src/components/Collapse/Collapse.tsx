import "../Collapse/Collapse.scss";
import { FunctionComponent, ReactNode, useState } from "react";

interface ICollapse {
    className?: string;
    children?: ReactNode;
    title?: string;
    open?: boolean
}

const Collapse: FunctionComponent<ICollapse> = ({
    className,
    children,
    title = "Collapse",
    open = false
}) => {
    const [opened, setOpened] = useState<boolean>(open);

    function clicked() {
        const currentOpened = opened;
        setOpened(!currentOpened);
    }

    return (
        <div className={`collapse ${className}`}>
            <div className="collapse-title" onClick={clicked}>
                <h2>{title}</h2>
            </div>
            <div
                className="collapse-body"
                hidden={!opened}
            >
                {children}
            </div>
        </div>
    );
}

export default Collapse;