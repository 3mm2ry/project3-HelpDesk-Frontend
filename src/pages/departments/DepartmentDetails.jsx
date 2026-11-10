import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getDepartmentById, deleteDepartment } from "../../services/departmentService";


function DepartmentDetails() {
  const { departmentId } = useParams();
  const navigate = useNavigate();
const [department, setDepartment] = useState(null);
const [error, setError] = useState("");

async function loadDepartment() {
  const response = await getDepartmentById(departmentId);
  setDepartment(response);
}

useEffect(() => {
  loadDepartment();
}, []);

async function handleDelete() {
  try {
    await deleteDepartment(departmentId);
    navigate("/departments");
  } catch (err) {
    setError(err?.response?.data?.error || "Could not delete department");
  }
}



  return (
    <div>
  <h1>Department Details</h1>

  {department ? (
    <>
      <h2>{department.name}</h2>
      <p>{department.description}</p>

      <Link to={`/departments/${departmentId}/edit`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>

      {error ? <p className="error">{error}</p> : null}
    </>
  ) : (
    <p>Loading...</p>
  )}
</div>

  );
}

export default DepartmentDetails;
