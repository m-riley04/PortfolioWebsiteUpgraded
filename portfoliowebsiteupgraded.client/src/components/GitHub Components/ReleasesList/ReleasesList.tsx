import { FunctionComponent } from "react";
import ProjectModel from "../../../models/ProjectModel";
import { GET_RELEASES } from "../../../graphql/Query";
import { useQuery } from "@apollo/client";
import { GithubRepositoryUrl, Release } from "../../../types/GitHubTypes";
import { parseGithubRepoUrl } from "../../../utils/GitHubUtils";
import "../CollaboratorsList/CollaboratorsList.scss";
import ReleasesListItem from "./ReleasesListItem";

interface IReleasesList {
    project: ProjectModel;
}

const ReleasesList: FunctionComponent<IReleasesList> = ({
    project
}) => {
    const repoUrl: GithubRepositoryUrl = parseGithubRepoUrl(project.repositoryUri ?? "");
    const { loading, error, data } = useQuery(GET_RELEASES, {
        variables: {
            repository: repoUrl.name,
            user: repoUrl.owner,
        },
    });

    if (loading) return (
        <>
            Loading...
        </>
    );
    if (error) return (
        <>
            Error: {error.message} <br/>
            Variables: <br/>
            - repository: {repoUrl.name} <br />
            - owner: {repoUrl.owner}
        </>
    );

    const releases: Release[] = data["user"]["repository"]["releases"]["nodes"];

    // Check for empty releases
    if (releases.length <= 0) return (
        <div className="releases-empty-container">
            <p>No releases to display.</p>
        </div>
    )

    if (data) return (
        <>
            {releases.map(r => <ReleasesListItem release={r} />)}
        </>
    );
}

export default ReleasesList;