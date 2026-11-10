import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllUsers } from "../../services/userService";




function UserList() {

  const [users, setUsers] = useState([]);
const [error, setError] = useState("");

async function loadUsers() {
  try {
    const response = await getAllUsers();
    setUsers(response);
  } catch (err) {
    setError(err?.response?.data?.message || "Could not load users");
  }
}

useEffect(() => {
  loadUsers();
}, []);


  return (
    <div>
      <h1>Users</h1>
      {error ? <p className="error">{error}</p> : null}

{users.map((oneUser) => (
  <div key={oneUser._id}>
    <Link to={`/users/${oneUser._id}`}>
      <h2>{oneUser.username}</h2>
    </Link>
    <p>Email: {oneUser.email}</p>
    <p>Role: {oneUser.role}</p>
    <p>Department: {oneUser.department ? oneUser.department.name : "None"}</p>
  </div>
))}

    </div>
  );
}

export default UserList;
