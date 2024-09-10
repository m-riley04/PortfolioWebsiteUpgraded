import { FunctionComponent } from "react";
import MessageBoxIconEnum from "../../enums/MessageBoxIconEnum";
import "../MessageBox/MessageBox.scss";
import ButtonOption from "../../models/ButtonOption";
import { useWindowManager } from "../../contexts/WindowContext/WindowContext";

interface IMessageBox {
    parentWindowTitle: string,
    icon: MessageBoxIconEnum;
    text: string;
    buttons?: ButtonOption[]
}

function getMessageBoxIcon(icon: MessageBoxIconEnum): string {
    switch (icon) {
        case MessageBoxIconEnum.ERROR:
            return "icons/msg_error.png";
        case MessageBoxIconEnum.WARNING:
            return "icons/msg_warning.png";
        case MessageBoxIconEnum.QUESTION:
            return "icons/msg_question.png";
        case MessageBoxIconEnum.INFORMATION:
            return "icons/msg_information.png";
        default:
            return "icons/msg_information.png";
    }
}

const MessageBox: FunctionComponent<IMessageBox> = ({
    parentWindowTitle,
    text = "Lorem ipsum",
    icon = MessageBoxIconEnum.INFORMATION,
    buttons = []
}) => {
    const { getWindowIdByTitle, removeWindowByKey } = useWindowManager();

    // Initialize default buttons
    if (buttons.length < 1) {
        const windowId: number = getWindowIdByTitle(parentWindowTitle);
        buttons = [{ title: "Ok", onClick: () => removeWindowByKey(windowId)}]
    }

    const buttonsContainer = (buttons?.length > 0) ? (
        <div className="dialog-button-container">
            {buttons.map((option, i) => <button key={i} onClick={option.onClick}><u>{option.title.charAt(0)}</u>{option.title.substring(1)}</button>)}
        </div>
    ) : <></>;

    return (
        <div className="message-box">
            <div className="message-container">
                <img src={getMessageBoxIcon(icon)} />
                <p>{text}</p>
            </div>
            
            {buttonsContainer}
        </div>
    );
}

export default MessageBox;