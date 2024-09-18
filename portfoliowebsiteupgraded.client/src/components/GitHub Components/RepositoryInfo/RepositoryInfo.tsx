import { FunctionComponent } from "react";
import ProjectModel from "../../../models/ProjectModel";
import { GET_REPOSITORY } from "../../../graphql/Query";
import { useQuery } from "@apollo/client";
import { GithubRepositoryUrl, Repository } from "../../../types/GitHubTypes";
import { parseGithubRepoUrl } from "../../../utils/GitHubUtils";
import "../RepositoryInfo/RepositoryInfo.scss";

interface IRepositoryInfo {
    project: ProjectModel;
}

const RepositoryInfo: FunctionComponent<IRepositoryInfo> = ({
    project
}) => {
    const repoUrl: GithubRepositoryUrl = parseGithubRepoUrl(project.repositoryUri ?? "");
    const { loading, error, data } = useQuery(GET_REPOSITORY, {
        variables: {
            name: repoUrl.name,
            username: repoUrl.owner,
        },
    });

    if (loading) return <>Loading...</>;
    if (error) return <>Error: {error.message}</>;

    const repository: Repository = data["repository"];

    if (data) return (
        <div className="repository-info">
            <div className="name-container">
                <h1>{repository.name}</h1>
            </div>
            <div className="button-container">
                <button>i</button>
                <div className="info-popup">
                    <p>Owner: {repository.owner.login}</p>
                    <p>Description: {repository.description}</p>
                    <p>Languages: {repository.languages.nodes.map(l => `${l.name}, `)}</p>
                    <p>Creation Date: {repository.createdAt}</p>
                    <p>Updated Date: {repository.updatedAt}</p>
                </div>
                <button onClick={
                    () => window.open(project.repositoryUri, "_blank")
                }><img src="/icons/github.png" alt="GitHub"></img></button>
            </div>
        </div>
    );
}

export default RepositoryInfo;