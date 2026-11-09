
import { useParams } from "react-router";

function AssetDetails() {
  const { assetId } = useParams();

  return (
    <div>
      <h1>Asset Details</h1>
      <p>Asset ID: {assetId}</p>
    </div>
  );
}

export default AssetDetails;
