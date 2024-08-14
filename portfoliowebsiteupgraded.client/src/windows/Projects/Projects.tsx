import { useEffect, useState } from 'react';
import ProjectModel from '../../models/ProjectModel';
import Directory from '../Directory/Directory';
import DirectoryItemModel from '../../models/DirectoryItemModel';
import FileTypeEnum from '../../enums/FileTypeEnum';

function Projects() {
    const [items, setItems] = useState<DirectoryItemModel[]>([]);

    useEffect(() => {
        populateProjectData();
    }, []);

    return (
        <Directory items={items} />
    );

    function projectToDirectoryItem(project: ProjectModel): DirectoryItemModel {
        return {
            name: project.name,
            description: project.description ?? "",
            dateModified: new Date(),
            type: FileTypeEnum.TEXT_DOCUMENT,
            onClick: () => {
                console.log(project)
        }};
    }

    async function populateProjectData() {
        try {
            const response = await fetch(`https://localhost:7036/api/projects`);
            const data = await response.json();

            // Transform each object in the array
            const transformedData: ProjectModel[] = data.map((project: ProjectModel) => toCamelCase(project));

            // Convert each project to a directory item
            const directoryItems = [];
            for (let i = 0; i < transformedData.length; i++) {
                directoryItems.push(projectToDirectoryItem(transformedData[i]));
            }

            setItems(directoryItems);
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

export default Projects;