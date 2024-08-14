import { FunctionComponent } from "react";
import MessageBoxIconEnum from "../../enums/MessageBoxIconEnum";
import "../MessageBox/MessageBox.scss";

interface IMessageBox {
    icon: MessageBoxIconEnum;
    text: string;
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
    text = "Lorem ipsum",
    icon = MessageBoxIconEnum.INFORMATION
}) => {
    return (
        <div className="message-box">
            <img src={getMessageBoxIcon(icon)} />
            <p>{text}</p>
        </div>
    );
}

export default MessageBox;