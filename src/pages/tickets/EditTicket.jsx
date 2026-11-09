
import { useParams } from "react-router";

function EditTicket() {
  const { ticketId } = useParams();

  return (
    <div>
      <h1>Edit Ticket</h1>
      <p>Editing Ticket ID: {ticketId}</p>
    </div>
  );
}

export default EditTicket;
