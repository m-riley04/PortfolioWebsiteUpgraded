import Draggable from "react-draggable";
import "../Shortcut/Shortcut.scss"

function Shortcut(props: { name: string, image_uri: string }) {
    return (
        <Draggable>
            <div className="shortcut">
                <p>{props.name}</p>
                <p>{props.image_uri}</p>
            </div>
        </Draggable>
    );
}

export default Shortcut;