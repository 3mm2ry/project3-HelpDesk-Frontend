import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  getAllAssets,
  approveBorrow,
  rejectBorrow,
  returnAsset,
} from "../../services/assetServices";

function AssetRequests() {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState("");
  async function loadAssets() {
    const response = await getAllAssets();
    setAssets(response);
  }

  useEffect(() => {
    loadAssets();
  }, []);

  async function handleApprove(assetId) {
    try {
      await approveBorrow(assetId);
      loadAssets();
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  async function handleReject(assetId) {
    try {
      await rejectBorrow(assetId);
      loadAssets();
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  async function handleReturn(assetId) {
    try {
      await returnAsset(assetId);
      loadAssets();
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  const pendingAssets = assets.filter(
    (oneAsset) => oneAsset.borrowStatus === "Pending",
  );
  const borrowedAssets = assets.filter(
    (oneAsset) => oneAsset.borrowStatus === "Borrowed",
  );

  return (
    <div>
      <h1>Borrow Requests</h1>
      <p className="error">{error}</p>
      <h2>Pending Requests</h2>
      {pendingAssets.length === 0 ? <p>No pending requests.</p> : null}

      {pendingAssets.map((oneAsset) => (
        <div key={oneAsset._id}>
          <h3>
            <Link to={`/assets/${oneAsset._id}`}>{oneAsset.name}</Link>
          </h3>
          <p>
            <b>Requested By:</b> {oneAsset.borrowedBy.username}
          </p>
          <p>
            <b>Return Date:</b>{" "}
            {new Date(oneAsset.expectedReturnDate).toLocaleDateString()}
          </p>
          <button onClick={() => handleApprove(oneAsset._id)}>Approve</button>
          <button onClick={() => handleReject(oneAsset._id)}>Reject</button>
        </div>
      ))}

      <h2>Currently Borrowed</h2>
      {borrowedAssets.length === 0 ? (
        <p>Nothing is borrowed right now.</p>
      ) : null}

      {borrowedAssets.map((oneAsset) => (
        <div key={oneAsset._id}>
          <h3>
            <Link to={`/assets/${oneAsset._id}`}>{oneAsset.name}</Link>
          </h3>
          <p>
            <b>Borrowed By:</b> {oneAsset.borrowedBy.username}
          </p>
          <p>
            <b>Due:</b>{" "}
            {new Date(oneAsset.expectedReturnDate).toLocaleDateString()}
          </p>
          <button onClick={() => handleReturn(oneAsset._id)}>
            Mark as Returned
          </button>
        </div>
      ))}
    </div>
  );
}

export default AssetRequests;
