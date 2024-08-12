import Shortcut from "../../components/Shortcut/Shortcut";
import "../Desktop/Desktop.scss";

interface ShortcutData {
    name: string;
    image_uri: string;
}

function Desktop(props: { shortcuts?: ShortcutData[] }) {
    return (
        <div className="desktop">
            {
                props.shortcuts?.map((shortcut, i) =>
                    <Shortcut key={i} name={shortcut.name} image_uri={shortcut.image_uri}/>
                ) ?? <Shortcut name="Default" image_uri="cat.jpg"/>
            }
        </div>
    );
}

export default Desktop;