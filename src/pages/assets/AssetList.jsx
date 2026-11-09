import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllAssets } from "../../services/assetServices";

function AssetList({ user }) {
  const [assets, setAssets] = useState([]);

  async function loadAssets() {
    const response = await getAllAssets();
    setAssets(response);
  }

  useEffect(() => {
    loadAssets();
  }, []);

  return (
    <div>
      <h1>Assets</h1>

      {user.role === "IT-Staff" || user.role === "Admin" ? (
        <>
          <Link to="/assets/new">Add Asset</Link>
          <Link to="/asset-requests">Borrow Requests</Link>
        </>
      ) : null}

      {assets.length === 0 ? <p>No assets yet.</p> : null}

      {assets.map((oneAsset) => (
        <div key={oneAsset._id}>
          <h2>{oneAsset.name}</h2>
          <p>Tag: {oneAsset.assetTag}</p>
          <p>Category: {oneAsset.category}</p>
          <p>Status: {oneAsset.status}</p>
          <Link to={`/assets/${oneAsset._id}`}>Asset Details</Link>
        </div>
      ))}
    </div>
  );
}

export default AssetList;
