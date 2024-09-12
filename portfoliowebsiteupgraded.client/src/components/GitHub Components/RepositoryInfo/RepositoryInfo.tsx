import { FunctionComponent, useState } from "react";
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

    const [popupVisible, setPopupVisible] = useState(false);

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

    const repository: Repository = data["repository"];

    if (data) return (
        <div className="repository-info">
            <div className="name-container">
                <h1>{repository.name}</h1>
            </div>
            <div className="button-container">
                <div hidden={!popupVisible} className="info-popup"
                onPointerOver={
                    () => setPopupVisible(true)
                }
                onPointerLeave={
                    () => setPopupVisible(false)
                }                >
                    <p>Owner: {repository.owner.login}</p>
                    <p>Description: {repository.description}</p>
                    <p>Languages: {repository.languages.nodes.map(l => `${l.name}, `)}</p>
                    <p>Creation Date: {repository.createdAt}</p>
                    <p>Updated Date: {repository.updatedAt}</p>
                </div>
                <button onPointerEnter={
                    () => setPopupVisible(true)
                }
                    onPointerOverCapture={
                        () => setPopupVisible(true)
                    }
                    onPointerOver={
                        () => setPopupVisible(true)
                    }
                    onPointerMove={
                        () => setPopupVisible(true)
                    }
                    onPointerOut={
                        () => setPopupVisible(false)
                    }>i</button>
                <button onClick={
                    () => window.open(project.repositoryUri, "_blank")
                }>Github</button>
            </div>
        </div>
    );
}

export default RepositoryInfo;