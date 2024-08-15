import { FunctionComponent } from "react";
import ProjectModel from "../../models/ProjectModel";
import "../ProjectView/ProjectView.scss";
import Markdown from "react-markdown";

interface IProjectView {
    project: ProjectModel
}

const ProjectView: FunctionComponent<IProjectView> = ({
    project
}) => {
    return (
        <div className="view">
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <p>Author: {project.authorId}</p>
            <p>Collaborators: {project.collaborators}</p>
            <p>README: <a href={project.readmeUri} target="_blank">here</a></p>
            <Markdown></Markdown>
            <p>Repository: <a href={project.repositoryUri} target="_blank">here</a></p>
            <p>Release: <a href={project.releaseUri} target="_blank">here</a></p>
            <p>Images: {project.images}</p>
        </div>
    );
}

export default ProjectView;