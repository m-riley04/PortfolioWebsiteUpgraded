import { FunctionComponent } from "react";
import ProjectModel from "../../models/ProjectModel";
import "../ProjectView/ProjectView.scss";
import { useQuery } from "@apollo/client";
import { GET_README, GITHUB_USERNAME } from "../../graphql/Query";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface IProjectView {
    project: ProjectModel
}

const ProjectView: FunctionComponent<IProjectView> = ({
    project
}) => {
    const REPO_NAME = "m-riley04";
    const { loading, error, data } = useQuery(GET_README, {
        variables: {
            repository: REPO_NAME,
            owner: GITHUB_USERNAME,
            filepath: "HEAD:README.md"
        },
    });

    if (loading) return (
        <>
            <p>Loading...</p>
        </>
    );

    if (error) return (
        <>
            <p>Error: {error.message}</p>
        </>
    );

    return (
        <div className="view">
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <p>Author: {project.authorId}</p>
            <p>Collaborators: {project.collaborators}</p>
            <p>README: <a href={project.readmeUri} target="_blank">here</a></p>
            <p>Repository: <a href={project.repositoryUri} target="_blank">here</a></p>
            <p>Release: <a href={project.releaseUri} target="_blank">here</a></p>
            <p>Images: {project.images}</p>
            <Markdown className="markdown" rehypePlugins={[rehypeRaw]}>{data["repository"]["object"]["text"]}</Markdown>
        </div>
    );
}

export default ProjectView;