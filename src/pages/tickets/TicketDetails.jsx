
import { useParams } from "react-router";

function TicketDetails() {
  const { ticketId } = useParams();

  return (
    <div>
      <h1>Ticket Details</h1>
      <p>Ticket ID: {ticketId}</p>
    </div>
  );
}

export default TicketDetails;
