export default interface ProjectModel {
    projectId: number;
    name: string;
    description: string | undefined;
    authorId: number;
    collaborators: string | undefined;
    images: string | undefined;
    repositoryUri: string | undefined;
    releaseUri: string | undefined;
    readmeUri: string | undefined;
    extraData: string | undefined;
}