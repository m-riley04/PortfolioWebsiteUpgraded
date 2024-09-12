import { FunctionComponent } from "react";
import ProjectModel from "../../../models/ProjectModel";
import { GET_COLLABORATORS } from "../../../graphql/Query";
import { useQuery } from "@apollo/client";
import { Collaborator, GithubRepositoryUrl } from "../../../types/GitHubTypes";
import { parseGithubRepoUrl } from "../../../utils/GitHubUtils";
import CollaboratorsListItem from "./CollaboratorsListItem";
import "../CollaboratorsList/CollaboratorsList.scss";

interface ICollaboratorsList {
    project: ProjectModel;
}

const CollaboratorsList: FunctionComponent<ICollaboratorsList> = ({
    project
}) => {
    const repoUrl: GithubRepositoryUrl = parseGithubRepoUrl(project.repositoryUri ?? "");
    const { loading, error, data } = useQuery(GET_COLLABORATORS, {
        variables: {
            repository: repoUrl.name,
            owner: repoUrl.owner,
        },
    });

    if (loading) return (
        <>
            Loading...
        </>
    );
    if (error) return (
        <>
            Error: {error.message}
        </>
    );

    const collaborators: Collaborator[] = data["repository"]["collaborators"]["nodes"];

    if (data) return (
        <>
            {collaborators.map(c => <CollaboratorsListItem collaborator={c} />)}
        </>
    );
}

export default CollaboratorsList;