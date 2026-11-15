import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { getTicketById } from "../../services/ticketService";

function TicketDetails() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);

  async function loadTicket() {
    const response = await getTicketById(ticketId);
    setTicket(response);
  }

  useEffect(() => {
    loadTicket();
  }, []);

  return (
    <div>
      <h1>Ticket Details</h1>

      {ticket && (
        <div>
          <h2>{ticket.title}</h2>
          <p>Description: {ticket.description}</p>
          <p>Category: {ticket.category}</p>
          <p>Priority: {ticket.priority}</p>
          <p>Status: {ticket.status}</p>
          <p>Contact Method: {ticket.contactMethod}</p>

          <h3>Images</h3>

          {ticket.images.map((image, index) => (
            <div key={index}>
              <img
                src={`http://localhost:3000${image}`}
                alt="Ticket"
                width="200"
              />
            </div>
          ))}

          <Link to={`/tickets/${ticket._id}/edit`}>Edit Ticket</Link>

          <h3>Comments</h3>

          <Link to={`/tickets/${ticket._id}/comments`}>
            View Comments / Add Comment
          </Link>
        </div>
      )}
    </div>
  );
}

export default TicketDetails;
