import "../../../CSS/Tickets.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment
} from "../../../services/commentService";

function Comments({ user }) {
  const { ticketId } = useParams();

  const [comments, setComments] = useState([]);

  const [formData, setFormData] = useState({
    message: "",
  });

  const [editId, setEditId] = useState(null);

  async function loadComments() {
    const response = await getComments(ticketId);
    setComments(response);
  }

  useEffect(() => {
    loadComments();
  }, []);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newComment = {
      ticket: ticketId,
      message: formData.message,
    };

    await createComment(newComment);

    setFormData({
      message: "",
    });

    loadComments();
  }

  function handleEdit(oneComment) {
    setEditId(oneComment._id);

    setFormData({
      message: oneComment.message,
    });
  }

  async function handleUpdate(event) {
    event.preventDefault();

    await updateComment(editId, {
      message: formData.message,
    });

    setEditId(null);

    setFormData({
      message: "",
    });

    loadComments();
  }

  async function handleDelete(commentId) {
    await deleteComment(commentId);
    loadComments();
  }

  return (
    <div className="page ticket-comments">
      <h1>Ticket Comments</h1>

      <h2>All Comments</h2>

      {comments.map((oneComment) =>
        <div key={oneComment._id}>
          <h3>{oneComment.author.username}</h3>

          <p>{oneComment.message}</p>

          <p>{new Date(oneComment.createdAt).toLocaleString()}</p>

          {user && user._id === oneComment.author._id && (
            <button onClick={() => handleEdit(oneComment)}>
              Edit
            </button>
          )}

          {user && (
            (user._id === oneComment.author._id || user.role === "Admin")
          ) && (
            <button onClick={() => handleDelete(oneComment._id)}>
              Delete
            </button>
          )}
        </div>
      )}

      <h2>{editId ? "Edit Comment" : "Add Comment"}</h2>

      <form onSubmit={editId ? handleUpdate : handleSubmit}>
        <label htmlFor="message">Comment:</label>

        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your comment..."
          required
        />

        <button type="submit">
          {editId ? "Update Comment" : "Submit Comment"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setFormData({ message: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default Comments;
