import { FunctionComponent } from "react";
import ProjectModel from "../../models/ProjectModel";
import "../ProjectView/ProjectView.scss";
import { useQuery } from "@apollo/client";
import { GET_README } from "../../graphql/Query";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ImageGallery from "../../components/ImageGallery/ImageGallery";

interface IProjectView {
    project: ProjectModel
}

interface GithubRepositoryUrl {
    host: string;
    owner: string;
    name: string;
}

/**
 * Parses a GitHub repository URL into a GithubRepositoryUrl object
 * @param githubUrl
 */
function parseGithubRepoUrl(githubUrl: string): GithubRepositoryUrl {
    // Check for non-github string
    if (githubUrl === "" || !githubUrl.includes("github.com")) {
        console.warn("The passed url is not from github.com. Defaulting to m-riley/m-riley repository.");
        return {
            host: "github.com",
            owner: "m-riley04",
            name: "m-riley04"
        }
    }

    // Check for http and https
    if (githubUrl.substring(0, 8) === "https://") {
        githubUrl = githubUrl.substring(8);
    } else if (githubUrl.substring(0, 7) === "http://") {
        githubUrl = githubUrl.substring(7);
    }

    // Split the parts of the url up
    const parts = githubUrl.split("/");

    // Create object
    return {
        host: parts[0],
        owner: parts[1],
        name: parts[2]
    }
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
        <div className="view">
            <a href={project.repositoryUri} target="_blank"><h1>{project.name}</h1></a>
            <p>{project.description}</p>
            <ImageGallery image_uris={project.images}></ImageGallery>
            <Markdown className="markdown" rehypePlugins={[rehypeRaw]}>{markdownTextRaw}</Markdown>
        </div>
    );
}

export default ProjectView;