
import { useParams } from "react-router";

function EditUser() {
  const { userId } = useParams();

  return (
    <div>
      <h1>Edit User</h1>
      <p>Editing User ID: {userId}</p>
    </div>
  );
}

export default EditUser;
