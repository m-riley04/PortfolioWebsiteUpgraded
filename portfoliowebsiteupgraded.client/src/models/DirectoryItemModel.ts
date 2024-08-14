import FileTypeEnum from "../enums/FileTypeEnum";

export default interface DirectoryItemModel {
    name: string;
    description: string;
    dateModified: Date;
    type: FileTypeEnum;
}