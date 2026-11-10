
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {getTicketById,updateTicketById} from "../../services/ticketService";

function EditTicket() {
  const { ticketId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    contactMethod: "",
  });

  const [images, setImages] = useState([]);

  async function loadTicket() {
    const response = await getTicketById(ticketId);
    setFormData(response);
  }

  useEffect(() => {
    loadTicket();
  }, []);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleImageChange(event) {
    setImages(event.target.files);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // We use FormData because we need to send new images
    // together with the updated ticket information.

    const ticketData = new FormData();

    ticketData.append("title", formData.title);
    ticketData.append("description", formData.description);
    ticketData.append("category", formData.category);
    ticketData.append("priority", formData.priority);
    ticketData.append("contactMethod", formData.contactMethod);

    for (let i = 0; i < images.length && i < 5; i++) {
      ticketData.append("images", images[i]);
    }

    await updateTicketById(ticketId, ticketData);

    navigate(`/tickets/${ticketId}`);
  }

  return (
    <div>
      <h1>Edit Ticket</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Technical">Technical</option>
          <option value="Account">Account</option>
          <option value="Network">Network</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="priority">Priority</label>
        <select
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label htmlFor="contactMethod">Contact Method</label>
        <select
          name="contactMethod"
          id="contactMethod"
          value={formData.contactMethod}
          onChange={handleChange}
        >
          <option value="Message">Message</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
        </select>

        <label htmlFor="images">Add New Images</label>
        <input
          type="file"
          name="images"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        <button type="submit">Update Ticket</button>
      </form>
    </div>
  );
}

export default EditTicket;
