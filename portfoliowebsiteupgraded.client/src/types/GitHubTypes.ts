export interface GithubRepositoryUrl {
    host: string;
    owner: string;
    name: string;
}

export interface Collaborator {
    login: string;
    name: string;
    url: string;
    avatarUrl: string;
}

export interface Owner {
    login: string;
}

export interface Forks {
    totalCount: number;
}

export interface Language {
    name: string;
    color: string;
}

export interface User {
    login: string,
    name: string,
    bio: string,
    url: string,
    avatarUrl: string,
    email: string
}

export interface ReleaseAsset {
    url: string,
    name: string,
    size: number,
    createdAt: string,
    contentType: string,
    downloadUrl: string
}

export interface ReleaseAssetConnection {
    totalCount: number,
    nodes: ReleaseAsset[]
}

export interface Release {
    tagName: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    url: string,
    isLatest: boolean,
    description: string,
    descriptionHTML: string,
    resourcePath: string,
    releaseAssets: ReleaseAssetConnection
}

export interface ReleaseConnection {
    totalCount: number;
    nodes: Release[]
}

export interface Repository {
    name: string,
    description: string,
    visibility: string,
    url: string,
    homepageUrl: string,
    openGraphImageUrl: string,
    owner: Owner,
    forks: Forks,
    collaborators: Array<Collaborator>,
    createdAt: string,
    updatedAt: string,
    pushedAt: string,
    latestRelease: Release | undefined,
    releases: ReleaseConnection | undefined,
    primaryLanguage: Language,
    languages: Array<Language>,
    resourcePath: string,
}