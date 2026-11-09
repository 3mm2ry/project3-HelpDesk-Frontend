
import { useParams } from "react-router";

function DepartmentDetails() {
  const { departmentId } = useParams();

  return (
    <div>
      <h1>Department Details</h1>
      <p>Department ID: {departmentId}</p>
    </div>
  );
}

export default DepartmentDetails;
