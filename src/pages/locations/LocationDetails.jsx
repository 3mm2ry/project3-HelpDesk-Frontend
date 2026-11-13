import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  getLocationById,
  deleteLocation,
} from "../../services/locationServices";
import { getAllTickets } from "../../services/ticketService";

import floor0 from "../../assets/floor-0_1.png";
import floor1 from "../../assets/floor-1_1.png";
import floor2 from "../../assets/floor-2_1.png";

import "./Location.css";

const floorImages = [floor0, floor1, floor2];
const floorNames = ["Ground", "First", "Second"];

function LocationDetails({ user }) {
  const [location, setLocation] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  const { locationId } = useParams();
  const navigate = useNavigate();

  async function loadLocation() {
    const foundLocation = await getLocationById(locationId);
    setLocation(foundLocation);

    const allTickets = await getAllTickets();
    const ticketsHere = allTickets.filter(
      (oneTicket) =>
        oneTicket.createdBy &&
        oneTicket.createdBy.location &&
        oneTicket.createdBy.location._id === locationId &&
        (oneTicket.status === "Open" || oneTicket.status === "In Progress"),
    );
    setTickets(ticketsHere);
  }

  useEffect(() => {
    loadLocation();
  }, []);

  async function handleDelete() {
    try {
      await deleteLocation(locationId);
      navigate("/locations");
    } catch (err) {
      setError(err.response.data.error);
    }
  }

  return (
    <div>
      <h1>Location Details</h1>
      <p className="error">{error}</p>

      {location ? (
        <>
          <h2>{location.officeNumber}</h2>
          <p>
            <b>Building:</b> {location.building}
          </p>
          <p>
            <b>Floor:</b> {floorNames[location.floor]}
          </p>
          <p>
            <b>Desk:</b> {location.deskNumber || "None"}
          </p>

          <div
            className="office-map"
            style={{ backgroundImage: `url(${floorImages[location.floor]})` }}
          >
            <div
              className={
                tickets.length > 0 ? "map-pin pin-red" : "map-pin pin-grey"
              }
              style={{
                left: `${location.coordinates.x}%`,
                top: `${location.coordinates.y}%`,
              }}
            >
              {tickets.length > 1 ? tickets.length : null}
            </div>
          </div>

          <h3>Active Tickets ({tickets.length})</h3>
          {tickets.length === 0 ? <p>No active tickets here.</p> : null}

          {tickets.map((oneTicket) => (
            <div key={oneTicket._id}>
              <h4>
                <Link to={`/tickets/${oneTicket._id}`}>{oneTicket.title}</Link>
              </h4>
              <p>
                <b>By:</b> {oneTicket.createdBy.username}
              </p>
              <p>
                <b>Priority:</b> {oneTicket.priority}
              </p>
              <p>
                <b>Status:</b> {oneTicket.status}
              </p>
            </div>
          ))}

          {user.role === "Admin" ? (
            <>
              <Link to={`/locations/${locationId}/edit`}>Edit Location</Link>
              <button onClick={handleDelete}>Delete Location</button>
            </>
          ) : null}

          <button onClick={() => navigate("/locations")}>Back to Map</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LocationDetails;
