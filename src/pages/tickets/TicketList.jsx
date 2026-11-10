import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllTickets } from "../../services/ticketService";

function TicketList({ user }) {
  console.log(user);

  const [tickets, setTickets] = useState([]);

  async function loadTickets() {
    const response = await getAllTickets();
    setTickets(response);
  }

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div>
      <h1>All Tickets</h1>

      {tickets.map((oneTicket) =>
        <div key={oneTicket._id}>
          <h2>{oneTicket.title}</h2>
          <p>{oneTicket.description}</p>
          <p>Category: {oneTicket.category}</p>
          <p>Priority: {oneTicket.priority}</p>
          <p>Status: {oneTicket.status}</p>

          <Link to={`/tickets/${oneTicket._id}`}>
            See Ticket
          </Link>
        </div>
      )}
    </div>
  );
}

export default TicketList;
