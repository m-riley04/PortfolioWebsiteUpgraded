import FileTypeEnum from "../../enums/FileTypeEnum";
import DirectoryItemModel from "../../models/DirectoryItemModel";
import "../Directory/Directory.scss";

interface IDirectory {
    items: DirectoryItemModel[];
}

function fileTypeToString(type: FileTypeEnum) {
    switch (type) {
        case FileTypeEnum.TEXT_DOCUMENT:
            return "Text Document";
        case FileTypeEnum.SHORTCUT:
            return "Shortcut";
        case FileTypeEnum.APPLICATION:
            return "Application";
        case FileTypeEnum.FILE:
        default:
            return "File";
    }
}

function Directory(props: IDirectory) {
    const table = (<div className="directory">
        <table>
            <thead>
                <tr className="header-row">
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Date Modified</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.items.map((item, i) =>
                        <tr key={i} className="body-row" onClick={item.onClick}>
                            <td className="icon-container"><img src={item.icon_uri ?? "icons/document.png"} />{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.dateModified.toDateString()}</td>
                            <td>{fileTypeToString(item.type)}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>);

    return (
        <div>
            {table}
        </div>
    );
}

export default Directory;