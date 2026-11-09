
import { useParams } from "react-router";

function EditAsset() {
  const { assetId } = useParams();

  return (
    <div>
      <h1>Edit Asset</h1>
      <p>Editing Asset ID: {assetId}</p>
    </div>
  );
}

export default EditAsset;
