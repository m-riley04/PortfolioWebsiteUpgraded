import { FunctionComponent } from "react";
import { Collaborator } from "../../../types/GitHubTypes";
import "../CollaboratorsList/CollaboratorsList.scss";

interface ICollaboratorsListItem {
    collaborator: Collaborator;
}

const CollaboratorsListItem: FunctionComponent<ICollaboratorsListItem> = ({
    collaborator
}) => {

    return (
        <a href={collaborator.url} target="_blank">
            <div className="collaborators-list-item">
                <img src={collaborator.avatarUrl} />
                <p>{collaborator.name} ({collaborator.login})</p>
            </div>
        </a>
    );
}

export default CollaboratorsListItem;