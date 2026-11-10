import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getMyProfile } from "../services/ProfileService";
import { getAllAssets } from "../services/assetServices";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [myAssets, setMyAssets] = useState([]);

  async function loadProfile() {
    const foundProfile = await getMyProfile();
    setProfile(foundProfile);

    const allAssets = await getAllAssets();
    const filteredAssets = allAssets.filter(
      (oneAsset) =>
        (oneAsset.borrowedBy && oneAsset.borrowedBy._id === foundProfile._id) ||
        (oneAsset.assignedTo && oneAsset.assignedTo._id === foundProfile._id),
    );
    setMyAssets(filteredAssets);
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div>
      <h1>My Profile</h1>

      {profile ? (
        <>
          <h2>{profile.username}</h2>
          <p>
            <b>Email:</b> {profile.email}
          </p>
          <p>
            <b>Role:</b> {profile.role}
          </p>
          <p>
            <b>Department:</b>{" "}
            {profile.department ? profile.department.name : "Not assigned"}
          </p>
          <p>
            <b>Location:</b>{" "}
            {profile.location
              ? `${profile.location.building} - Floor ${profile.location.floor} - Office ${profile.location.officeNumber} - Desk ${profile.location.deskNumber}`
              : "Not assigned"}
          </p>
          <p>
            <b>Employee Since:</b>{" "}
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>

          <h2>My Assets</h2>
          {myAssets.length === 0 ? <p>You have no assets.</p> : null}

          {myAssets.map((oneAsset) => (
            <div key={oneAsset._id}>
              <h3>
                <Link to={`/assets/${oneAsset._id}`}>{oneAsset.name}</Link>
              </h3>
              <p>
                <b>Tag:</b> {oneAsset.assetTag}
              </p>
              <p>
                <b>Borrow Status:</b> {oneAsset.borrowStatus}
              </p>
              {oneAsset.expectedReturnDate ? (
                <p>
                  <b>Return By:</b>{" "}
                  {new Date(oneAsset.expectedReturnDate).toLocaleDateString()}
                </p>
              ) : null}
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
