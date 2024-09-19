import { useEffect, useState } from 'react';
import ProjectModel from '../../models/ProjectModel';
import Directory from '../Directory/Directory';
import DirectoryItemModel from '../../models/DirectoryItemModel';
import FileTypeEnum from '../../enums/FileTypeEnum';
import { useWindowManager } from '../../contexts/WindowContext/WindowContext';
import IWindow from '../../interfaces/IWindow';
import WindowTypeEnum from '../../enums/WindowTypeEnum';
import ProjectView from '../ProjectView/ProjectView';

/**
 * Turns all keys of an object into camel case typing
 * @param obj
 * @returns
 */
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

function parseJsonStrings(obj: any): any {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let value = obj[key];

            // Check if the value is a JSON string and parse it
            if (typeof value === 'string') {
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    // If parsing fails, keep the value as it is
                }
            }
            obj[key] = value;
        }
    }

    return obj;
}

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
            width_vw: 60,
            height_vh: 90,
            icon_uri: "icons/document.png", // No data-driven icon for now
            type: WindowTypeEnum.DEFAULT,
            className: "project-body"
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
            const response = await fetch(`/api/projects`);

            // Check network response
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Transform and parse each object in the array
            let transformedData: ProjectModel[] = data.map((project: ProjectModel) => toCamelCase(project));
            transformedData = transformedData.map((project: ProjectModel) => parseJsonStrings(project));

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
}

export default Projects;