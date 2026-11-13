import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getAllLocations } from "../../services/locationServices";
import { getAllTickets } from "../../services/ticketService";
import { getMyProfile } from "../../services/ProfileService";

import floor0 from "../../assets/floor-0_1.png";
import floor1 from "../../assets/floor-1_1.png";
import floor2 from "../../assets/floor-2_1.png";

import "./Location.css";

const floorImages = [floor0, floor1, floor2];
const floorNames = ["Ground", "First", "Second"];

function LocationList({ user }) {
  const [locations, setLocations] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const navigate = useNavigate();

  const isStaff = user.role === "IT-Staff" || user.role === "Admin";

  async function loadMap() {
    const allTickets = await getAllTickets();
    const activeTickets = allTickets.filter(
      (oneTicket) =>
        oneTicket.status === "Open" || oneTicket.status === "In Progress",
    );
    setTickets(activeTickets);

    if (isStaff) {
      const allLocations = await getAllLocations();
      setLocations(allLocations);
    } else {
      const myProfile = await getMyProfile();
      setProfile(myProfile);
    }
  }

  useEffect(() => {
    loadMap();

    const timer = setInterval(loadMap, 30000);

    return () => clearInterval(timer);
  }, []);

  function getTicketLocation(oneTicket) {
    if (oneTicket.createdBy && oneTicket.createdBy.location) {
      return oneTicket.createdBy.location;
    }
    return null;
  }

  function getTicketsForLocation(locationId) {
    return tickets.filter(
      (oneTicket) =>
        getTicketLocation(oneTicket) &&
        getTicketLocation(oneTicket)._id === locationId,
    );
  }

  function countTicketsOnFloor(floor) {
    return tickets.filter(
      (oneTicket) =>
        getTicketLocation(oneTicket) &&
        getTicketLocation(oneTicket).floor === floor,
    ).length;
  }

  const ticketsWithoutLocation = tickets.filter(
    (oneTicket) => !getTicketLocation(oneTicket),
  );

  function getPinClass(oneLocation) {
    const count = getTicketsForLocation(oneLocation._id).length;

    if (count > 0) return "map-pin pin-red";
    if (isStaff) return "map-pin pin-grey";
    return "map-pin pin-blue";
  }

  let pins = [];
  let floorToShow = selectedFloor;

  if (isStaff) {
    pins = locations.filter(
      (oneLocation) => oneLocation.floor === selectedFloor,
    );
  } else if (profile && profile.location) {
    pins = [profile.location];
    floorToShow = profile.location.floor;
  }

  return (
    <div>
      <h1>Office Map</h1>
      {user.role === "Admin" ? (
        <Link to="/locations/new">Add Location</Link>
      ) : null}
      {isStaff ? (
        <div>
          {floorNames.map((floorName, index) => (
            <button key={floorName} onClick={() => setSelectedFloor(index)}>
              {floorName}{" "}
              {countTicketsOnFloor(index) > 0
                ? `(${countTicketsOnFloor(index)})`
                : null}
            </button>
          ))}
        </div>
      ) : null}
      {!isStaff && profile && !profile.location ? (
        <p>You don't have a location yet. Ask an admin to set it.</p>
      ) : null}
      <h3>Showing: {floorNames[floorToShow]} floor</h3>
      <div
        className="office-map"
        style={{ backgroundImage: `url(${floorImages[floorToShow]})` }}
      >
        {pins.map((oneLocation) => (
          <div
            key={oneLocation._id}
            className={getPinClass(oneLocation)}
            style={{
              left: `${oneLocation.coordinates.x}%`,
              top: `${oneLocation.coordinates.y}%`,
            }}
            onMouseEnter={() => setHoveredLocation(oneLocation)}
            onMouseLeave={() => setHoveredLocation(null)}
            onClick={() =>
              isStaff ? navigate(`/locations/${oneLocation._id}`) : null
            }
          >
            {getTicketsForLocation(oneLocation._id).length > 1
              ? getTicketsForLocation(oneLocation._id).length
              : null}
          </div>
        ))}

        {hoveredLocation ? (
          <div
            className="map-info"
            style={{
              left: `${hoveredLocation.coordinates.x}%`,
              top: `${hoveredLocation.coordinates.y}%`,
            }}
          >
            {!isStaff ? (
              <p>
                <b>You are here</b>
              </p>
            ) : null}
            <p>
              <b>Room:</b> {hoveredLocation.officeNumber}
            </p>
            <p>
              <b>Floor:</b> {floorNames[hoveredLocation.floor]}
            </p>

            {getTicketsForLocation(hoveredLocation._id).map((oneTicket) => (
              <p key={oneTicket._id}>
                🔴 {oneTicket.title}
                {isStaff ? ` - ${oneTicket.createdBy.username}` : null}
              </p>
            ))}
          </div>
        ) : null}
      </div>
      {/* // here IF the admin forgot to locate the new emp and the ep suppmeted a
      ticket */}
      {isStaff && ticketsWithoutLocation.length > 0 ? (
        <div>
          <h3>Tickets without a location</h3>
          {ticketsWithoutLocation.map((oneTicket) => (
            <p key={oneTicket._id}>
              <Link to={`/tickets/${oneTicket._id}`}>{oneTicket.title}</Link> -{" "}
              {oneTicket.createdBy ? oneTicket.createdBy.username : "Unknown"}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default LocationList;
