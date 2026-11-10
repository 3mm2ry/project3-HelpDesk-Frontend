import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getUserById, deleteUser } from "../../services/userService";


function UserDetails() {
  const { userId } = useParams();

  const navigate = useNavigate();
const [user, setUser] = useState(null);
const [error, setError] = useState("");

async function loadUser() {
  try {
    const response = await getUserById(userId);
    setUser(response);
  } catch (err) {
    setError(err?.response?.data?.message || "Could not load user");
  }
}

useEffect(() => {
  loadUser();
}, []);

async function handleDelete() {
  try {
    await deleteUser(userId);
    navigate("/users");
  } catch (err) {
    setError(err?.response?.data?.message || "Could not delete user");
  }
}



  return (
    <div>
  <h1>User Details</h1>

  {error ? <p className="error">{error}</p> : null}

  {user ? (
    <>
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Department: {user.department ? user.department.name : "None"}</p>
      <p>
        Location:{" "}
        {user.location
          ? `${user.location.building}, Floor ${user.location.floor}, Office ${user.location.officeNumber}, Desk ${user.location.deskNumber}`
          : "None"}
      </p>

      <Link to={`/users/${userId}/edit`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </>
  ) : (
    <p>Loading...</p>
  )}
</div>

  );
}

export default UserDetails;
