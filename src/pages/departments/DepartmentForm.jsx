
import { useParams } from "react-router";

function DepartmentForm() {
  const { departmentId } = useParams();

  return (
    <div>
      <h1>{departmentId ? "Edit Department" : "Create Department"}</h1>
    </div>
  );
}

export default DepartmentForm;
