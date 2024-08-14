import MessageBoxIconEnum from "../../enums/MessageBoxIconEnum";

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

function MessageBox(props: IMessageBox) {
    return (
        <div className="message-box">
            <div className="body-container">
                <img src={getMessageBoxIcon(props.icon)} />
                <p>{props.text}</p>
            </div>
            <button>Close</button>
        </div>
    );
}

export default MessageBox;