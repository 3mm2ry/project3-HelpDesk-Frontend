
import { useParams } from "react-router";

function Comments() {
  const { ticketId } = useParams();

  return (
    <div>
      <h1>Ticket Comments</h1>

      <p>Comments for Ticket ID: {ticketId}</p>

      <form>
        <label htmlFor="comment">Add Comment</label>

        <textarea
          id="comment"
          name="comment"
          placeholder="Write your comment..."
        />

        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
}

export default Comments;
