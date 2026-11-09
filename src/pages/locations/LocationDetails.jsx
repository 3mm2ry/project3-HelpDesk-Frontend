
import { useParams } from "react-router";

function LocationDetails() {
  const { locationId } = useParams();

  return (
    <div>
      <h1>Location Details</h1>
      <p>Location ID: {locationId}</p>
    </div>
  );
}

export default LocationDetails;
