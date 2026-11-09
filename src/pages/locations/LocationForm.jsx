
import { useParams } from "react-router";

function LocationForm() {
  const { locationId } = useParams();

  return (
    <div>
      <h1>{locationId ? "Edit Location" : "Create Location"}</h1>
    </div>
  );
}

export default LocationForm;
