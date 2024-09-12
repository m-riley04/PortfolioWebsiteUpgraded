import { FunctionComponent } from "react";
import ProjectModel from "../../models/ProjectModel";
import "../ProjectView/ProjectView.scss";
import { useQuery } from "@apollo/client";
import { GET_README } from "../../graphql/Query";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ImageGallery from "../../components/MediaGallery/MediaGallery";
import Collapse from "../../components/Collapse/Collapse";
import { GithubRepositoryUrl } from "../../types/GitHubTypes";
import { parseGithubRepoUrl } from "../../utils/GitHubUtils";
import ProjectCollaborators from "../../components/GitHub Components/CollaboratorsList/CollaboratorsList";

interface IProjectView {
    project: ProjectModel
}

const ProjectView: FunctionComponent<IProjectView> = ({
    project
}) => {

    const repoUrl: GithubRepositoryUrl = parseGithubRepoUrl(project.repositoryUri ?? "");
    const { loading, error, data } = useQuery(GET_README, {
        variables: {
            repository: repoUrl.name,
            owner: repoUrl.owner,
            filepath: "HEAD:README.md"
        },
    });

    if (loading) return (
        <>
            <p>Loading project...</p>
        </>
    );

    if (error) return (
        <>
            <p>Error: {error.message}</p>
        </>
    );

    const markdownTextRaw = data["repository"]["object"]["text"];

    return (
        <div className="container">
            <header className="header">
                <div className="logo">
                    <h1>{project.name}</h1>
                    <p>{project.description}</p>
                    <span className="language">Language(s): </span>
                    <a href={project.repositoryUri} target="_blank"><p>GitHub</p></a>
                </div>
            </header>
            
            <div className="content">
                <div className="left-column">
                    <section>
                        <Collapse title="README.md" className="readme" open={true}>
                            <Markdown className="markdown" rehypePlugins={[rehypeRaw]}>{markdownTextRaw}</Markdown>
                        </Collapse>
                    </section>
                </div>
                <div className="right-column">
                    <section className="images">
                        <h3>Media</h3>
                        <ImageGallery uris={project.images}></ImageGallery>
                    </section>
                    <section className="collaborators">
                        <h3>Collaborators</h3>
                        <ProjectCollaborators project={project}/>
                    </section>
                    <section className="releases">
                        <h3>Releases</h3>

                    </section>
                </div>
            </div>
        </div>
    );
}

export default ProjectView;