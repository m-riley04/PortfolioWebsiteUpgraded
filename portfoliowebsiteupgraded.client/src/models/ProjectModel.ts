export default interface ProjectModel {
    projectId: number;
    name: string;
    description: string | undefined;
    images: string[];
    repositoryUri: string | undefined;
    extraData: string | undefined;
}