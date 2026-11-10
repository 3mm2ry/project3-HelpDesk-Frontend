import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getDepartmentById, createDepartment, updateDepartment } from "../../services/departmentService";


function DepartmentForm() {
  const { departmentId } = useParams();

  const navigate = useNavigate();
const [formData, setFormData] = useState({
  name: "",
  description: "",
});
const [error, setError] = useState("");

async function loadDepartment() {
  const response = await getDepartmentById(departmentId);
  setFormData(response);
}

useEffect(() => {
  if (departmentId) {
    loadDepartment();
  }
}, []);

function handleChange(event) {
  setFormData({ ...formData, [event.target.name]: event.target.value });
}

async function handleSubmit(event) {
  event.preventDefault();
  try {
    if (departmentId) {
      await updateDepartment(departmentId, formData);
      navigate(`/departments/${departmentId}`);
    } else {
      await createDepartment(formData);
      navigate("/departments");
    }
  } catch (err) {
    setError(err?.response?.data?.error || "Could not save department");
  }
}



  return (
   <div>
  <h1>{departmentId ? "Edit Department" : "Create Department"}</h1>

  <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <label htmlFor="description">Description</label>
    <textarea
      id="description"
      name="description"
      value={formData.description}
      onChange={handleChange}
    />

    <button type="submit">{departmentId ? "Save Changes" : "Create"}</button>
  </form>

  {error ? <p className="error">{error}</p> : null}
</div>

  );
}

export default DepartmentForm;
