import FileTypeEnum from "../enums/FileTypeEnum";

export default interface DirectoryItemModel {
    id: number;
    name: string;
    icon_uri?: string;
    description: string;
    dateModified: Date;
    type: FileTypeEnum;
    onClick?: () => void;
}