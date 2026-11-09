
import { useParams } from "react-router";

function UserDetails() {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}

export default UserDetails;
