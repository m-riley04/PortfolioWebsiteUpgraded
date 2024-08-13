import IWindow from "../../interfaces/IWindow";
import "../Taskbar/Taskbar.scss";

interface ITaskbar {
    windows: IWindow[];
}

function getTimeStringFormatted(time: Date): string {
    return `${time.getHours() > 12 ? time.getHours() - 12 : time.getHours()}:${time.getMinutes().toString().length < 2 ? `0${time.getMinutes()}` : time.getMinutes()} ${time.getHours() > 11 ? "PM" : "AM"}`;
}

function Taskbar(props: ITaskbar) {
    const time = new Date();

    return (
        <div className="taskbar">
            <div className="tabs-container">
                <button className="button-start"><img src="windows.png" />Start</button>
                {props.windows.map((window) => 
                    <button key={window.id}>{window.title}</button>
                )}
            </div>
            <div className="tray-container">
                <button><img src="loudspeaker.png"/></button>
                <p>{getTimeStringFormatted(time)}</p>
            </div>
        </div>
    );
}

export default Taskbar;