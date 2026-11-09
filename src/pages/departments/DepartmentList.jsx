import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllDepartments } from "../../services/departmentService";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  async function loadDepartments() {
    const response = await getAllDepartments();
    setDepartments(response);
  }

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <div>
      <h1>Departments</h1>
      <Link to="/departments/new">Add Department</Link>

      {departments.map((oneDepartment) => (
        <div key={oneDepartment._id}>
          <Link to={`/departments/${oneDepartment._id}`}>
            <h2>{oneDepartment.name}</h2>
          </Link>
          <p>{oneDepartment.description}</p>
        </div>
      ))}
    </div>
  );
}

export default DepartmentList;
