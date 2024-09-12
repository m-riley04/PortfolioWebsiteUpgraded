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
        <div className="collaborators-list-item" onClick={
            () => window.open(collaborator.url, "_blank")
        }>
            <img src={collaborator.avatarUrl} />
            <p>{collaborator.login} ({collaborator.name})</p>
        </div>
    );
}

export default CollaboratorsListItem;