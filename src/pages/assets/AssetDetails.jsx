import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getAssetById,
  deleteAsset,
  borrowAsset,
  cancelBorrow,
  returnAsset,
} from "../../services/assetServices";

function AssetDetails({ user }) {
  const [asset, setAsset] = useState(null);
  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [error, setError] = useState("");

  const { assetId } = useParams();
  const navigate = useNavigate();

  const isStaff = user.role === "IT-Staff" || user.role === "Admin";

  async function loadAsset() {
    const response = await getAssetById(assetId);
    setAsset(response);
  }

  useEffect(() => {
    loadAsset();
  }, []);

  async function handleBorrow(event) {
    event.preventDefault();
    try {
      await borrowAsset(assetId, expectedReturnDate);
      setExpectedReturnDate("");
      loadAsset();
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  async function handleCancel() {
    try {
      await cancelBorrow(assetId);
      loadAsset();
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  async function handleReturn() {
    try {
      await returnAsset(assetId);
      loadAsset();
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  async function handleDelete() {
    try {
      await deleteAsset(assetId);
      navigate("/assets");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <div>
      <h1>Asset Details</h1>
      <p className="error">{error}</p>

      {asset ? (
        <>
          <h2>{asset.name}</h2>
          <p>
            <b>Tag:</b> {asset.assetTag}
          </p>
          <p>
            <b>Category:</b> {asset.category}
          </p>
          <p>
            <b>Serial Number:</b> {asset.serialNumber}
          </p>
          <p>
            <b>Status:</b> {asset.status}
          </p>

          {asset.images.length > 0 ? (
            <div>
              {asset.images.map((image) => (
                <img
                  key={image}
                  src={`${import.meta.env.VITE_BACK_END_SERVER_URL}${image}`}
                  alt={asset.name}
                  width="200"
                />
              ))}
            </div>
          ) : (
            <p>No images</p>
          )}

          {isStaff ? (
            <>
              <p>
                <b>Borrow Status:</b> {asset.borrowStatus}
              </p>

              {asset.assignedTo ? (
                <p>
                  <b>Assigned To:</b> {asset.assignedTo.username}
                </p>
              ) : null}

              {asset.borrowedBy ? (
                <>
                  <p>
                    <b>Borrowed By:</b> {asset.borrowedBy.username}
                  </p>
                  <p>
                    <b>Expected Return:</b>{" "}
                    {new Date(asset.expectedReturnDate).toLocaleDateString()}
                  </p>
                </>
              ) : null}
            </>
          ) : null}
          {asset.status === "Available" &&
          asset.borrowStatus === "Available" ? (
            <form onSubmit={handleBorrow}>
              <label htmlFor="expectedReturnDate">Return Date:</label>
              <input
                type="date"
                id="expectedReturnDate"
                value={expectedReturnDate}
                onChange={(event) => setExpectedReturnDate(event.target.value)}
                required
              />
              <button>Request to Borrow</button>
            </form>
          ) : null}

          {asset.borrowStatus === "Pending" &&
          asset.borrowedBy &&
          asset.borrowedBy._id === user._id ? (
            <button onClick={handleCancel}>Cancel My Request</button>
          ) : null}

          {isStaff ? (
            <>
              <button onClick={() => navigate(`/assets/${asset._id}/edit`)}>
                Edit Asset
              </button>
              <button onClick={handleDelete}>Delete Asset</button>

              {asset.borrowStatus === "Borrowed" ? (
                <button onClick={handleReturn}>Mark as Returned</button>
              ) : null}
            </>
          ) : null}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AssetDetails;
