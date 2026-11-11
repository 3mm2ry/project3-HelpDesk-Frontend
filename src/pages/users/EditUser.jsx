import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getUserById, updateUser } from "../../services/userService";
import { getAllDepartments } from "../../services/departmentService";
import { getAllLocations } from "../../services/locationServices";


function EditUser() {
  const { userId } = useParams();

  const navigate = useNavigate();
const [formData, setFormData] = useState({
  username: "",
  email: "",
  role: "",
  department: "",
  location: "",
});
const [departments, setDepartments] = useState([]);
const [locations, setLocations] = useState([]);
const [error, setError] = useState("");

async function loadUser() {
  try {
    const response = await getUserById(userId);
    setFormData({
      username: response.username,
      email: response.email,
      role: response.role,
      department: response.department ? response.department._id : "",
      location: response.location ? response.location._id : "",
    });
  } catch (err) {
    setError(err?.response?.data?.message || "Could not load user");
  }
}

async function loadDepartments() {
  const response = await getAllDepartments();
  setDepartments(response);
}

async function loadLocations() {
  const response = await getAllLocations();
  setLocations(response);
}

useEffect(() => {
  loadUser();
  loadDepartments();
  loadLocations();
}, []);


function handleChange(event) {
  setFormData({ ...formData, [event.target.name]: event.target.value });
}

async function handleSubmit(event) {
  event.preventDefault();
  try {
    await updateUser(userId, formData);
    navigate(`/users/${userId}`);
  } catch (err) {
    setError(err?.response?.data?.message || "Could not update user");
  }
}


  return (
    <div>
  <h1>Edit User</h1>

  <form onSubmit={handleSubmit}>
    <label htmlFor="username">Username</label>
    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

    <label htmlFor="email">Email</label>
    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

    <label htmlFor="role">Role</label>
    <select id="role" name="role" value={formData.role} onChange={handleChange}>
      <option value="Employee">Employee</option>
      <option value="IT-Staff">IT-Staff</option>
      <option value="Admin">Admin</option>
    </select>

    <label htmlFor="department">Department</label>
    <select id="department" name="department" value={formData.department} onChange={handleChange}>
      <option value="">-------</option>
      {departments.map((oneDepartment) => (
        <option key={oneDepartment._id} value={oneDepartment._id}>
          {oneDepartment.name}
        </option>
      ))}
    </select>

    <label htmlFor="location">Location</label>
    <select id="location" name="location" value={formData.location} onChange={handleChange}>
      <option value="">-------</option>
      {locations.map((oneLocation) => (
        <option key={oneLocation._id} value={oneLocation._id}>
          {oneLocation.building}, Floor {oneLocation.floor}, Desk {oneLocation.deskNumber}
        </option>
      ))}
    </select>

    <button type="submit">Save Changes</button>
  </form>

  {error ? <p className="error">{error}</p> : null}
</div>

  );
}

export default EditUser;
