export default interface ProjectModel {
    userId: number;
    name: string;
    passwordHash: string;
    avatarUri: string | undefined;
    extraData: string | undefined;
}