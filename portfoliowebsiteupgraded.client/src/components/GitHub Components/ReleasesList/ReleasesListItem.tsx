import { FunctionComponent } from "react";
import { Release, ReleaseAssetConnection } from "../../../types/GitHubTypes";
import "../ReleasesList/ReleasesList.scss";

interface IReleasesListItem {
    release: Release;
}

const ReleasesListItem: FunctionComponent<IReleasesListItem> = ({
    release
}) => {

    function getDownloadLink(releaseAssetConnection: ReleaseAssetConnection) {
        return releaseAssetConnection.nodes[0].downloadUrl;
    }

    return (
        <div className="releases-list-item">
            <div className="left-column">
                {release.isLatest ? <i className="latest-tag">Latest</i> : <></>}
                <p>{release.tagName}</p>
            </div>
            <div className="right-column">
                <button onClick={
                    () => window.open(getDownloadLink(release.releaseAssets), "_blank")
                }>Download</button>
                <button onClick={
                    () => window.open(release.url, "_blank")
                }>View</button>
            </div>
        </div>
    );
}

export default ReleasesListItem;