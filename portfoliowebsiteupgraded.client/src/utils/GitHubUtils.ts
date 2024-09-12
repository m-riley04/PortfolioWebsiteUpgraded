import { GithubRepositoryUrl } from "../types/GitHubTypes";

/**
 * Parses a GitHub repository URL into a GithubRepositoryUrl object
 * @param githubUrl
 */
export function parseGithubRepoUrl(githubUrl: string): GithubRepositoryUrl {
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