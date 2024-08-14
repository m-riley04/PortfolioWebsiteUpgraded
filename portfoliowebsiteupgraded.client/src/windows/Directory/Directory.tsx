import FileTypeEnum from "../../enums/FileTypeEnum";
import DirectoryItemModel from "../../models/DirectoryItemModel";

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
    return (
        <div className="directory">
            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Date Modified</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    props.items.map((item, i) =>
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.dateModified.toDateString()}</td>
                            <td>{fileTypeToString(item.type)}</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Directory;