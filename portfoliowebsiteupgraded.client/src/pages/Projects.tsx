import { useEffect, useState } from 'react';

interface Project {
    projectId: number;
    name: string;
    description: string | undefined;
    authorId: number;
    collaborators: string | undefined;
    images: string | undefined;
    repositoryUri: string | undefined;
    releaseUri: string | undefined;
    readmeUri: string | undefined;
    extraData: string | undefined;
}

function Project() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        populateProjectData();
    }, []);

    const contents = projects.length === 0
        ? <p><em>Loading...Please refresh once the ASP.NET backend has started.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Author Id</th>
                    <th>Collaborators</th>
                    <th>Images</th>
                    <th>Repository URI</th>
                    <th>Release URI</th>
                    <th>README URI</th>
                    <th>Extra Data</th>
                </tr>
            </thead>
            <tbody>
            {
                projects.map((project, i) =>
                    <tr key={i}>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>{project.authorId}</td>
                        <td>{project.collaborators}</td>
                        <td>{project.images}</td>
                        <td>{project.repositoryUri}</td>
                        <td>{project.releaseUri}</td>
                        <td>{project.readmeUri}</td>
                        <td>{project.extraData}</td>
                    </tr>
                )
            }
            </tbody>
        </table>;

    return (

        <div>
            <h1 id="tabelLabel"> Projects </h1>
            <p>This component demonstrates fetching data from the server.</p>
            { contents }
            <button onClick={ refresh_clicked }>Refresh</button>
        </div>
    );

    async function refresh_clicked() {
        await populateProjectData();
        console.log('Projects state: ', projects)
    }

    async function populateProjectData() {
        try {
            const response = await fetch(`https://localhost:7036/api/projects`);
            const data = await response.json();

            // Transform each object in the array
            const transformedData = data.map((project: Project) => toCamelCase(project));

            setProjects(transformedData);
        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    }

    function toCamelCase(obj: any): any {
        const newObj: any = {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newKey = key.charAt(0).toLowerCase() + key.slice(1);
                newObj[newKey] = obj[key];
            }
        }

        return newObj;
    }
}

export default Project;