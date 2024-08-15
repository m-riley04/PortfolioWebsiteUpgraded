import { useEffect, useState } from 'react';
import ProjectModel from '../../models/ProjectModel';
import Directory from '../Directory/Directory';
import DirectoryItemModel from '../../models/DirectoryItemModel';
import FileTypeEnum from '../../enums/FileTypeEnum';
import { useWindowManager } from '../../contexts/WindowContext/WindowContext';
import IWindow from '../../interfaces/IWindow';
import WindowTypeEnum from '../../enums/WindowTypeEnum';
import ProjectView from '../ProjectView/ProjectView';

function Projects() {
    const { addWindow } = useWindowManager();
    const [items, setItems] = useState<DirectoryItemModel[]>([]);

    useEffect(() => {
        populateProjectData();
    }, []);

    return (
        <Directory items={items} />
    );

    function openProjectWindow(project: ProjectModel) {
        const window: IWindow = {
            id: 0, // This will be set by the context
            title: project.name,
            element: <ProjectView project={project} />,
            width: 1000,
            height: 800,
            icon_uri: "icons/document.png", // No data-driven icon for now
            type: WindowTypeEnum.DEFAULT
        };
        addWindow(window);
    }

    function projectToDirectoryItem(project: ProjectModel): DirectoryItemModel {
        return {
            id: project.projectId,
            name: project.name,
            description: project.description ?? "",
            dateModified: new Date(),
            type: FileTypeEnum.TEXT_DOCUMENT,
            onClick: () => openProjectWindow(project)
        };
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