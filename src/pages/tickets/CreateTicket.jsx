import { useState } from "react";
import { createNewTicket } from "../../services/ticketService";
import { useNavigate } from "react-router";

function CreateTicket() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    contactMethod: "Message",
  });

  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  // Handle changes in form inputs
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // Handle image selection
  function handleImageChange(event) {
    setImages(event.target.files);
  }

  // Submit the ticket
  async function handleSubmit(event) {
    event.preventDefault();

   /*  // we can't use this way because we have image in the form */

/*       async function handleSubmit(event) {
    event.preventDefault();

    const createdTicket = await createNewTicket(formData, images);

    navigate("/tickets");
  } */


    // Create FormData to send ticket details and images
    const ticketData = new FormData();


    // Add ticket details
    ticketData.append("title", formData.title);
    ticketData.append("description", formData.description);
    ticketData.append("category", formData.category);
    ticketData.append("priority", formData.priority);
    ticketData.append("contactMethod", formData.contactMethod);

    // Add selected images
    for (let image of images) {
      ticketData.append("images", image);
    }

    // Send ticket data to backend
    await createNewTicket(ticketData);

    navigate("/tickets");
  }

  return (
    <div>
      <h1>Create Ticket</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          id="title"
          onChange={handleChange}
          value={formData.title}
          required
        />

        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
          value={formData.description}
          required
        />

        <label htmlFor="category">Category: </label>
        <select
          value={formData.category}
          onChange={handleChange}
          name="category"
          id="category"
          required
        >
          <option value="">-------</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Network">Network</option>
          <option value="Account">Account</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="priority">Priority: </label>
        <select
          value={formData.priority}
          onChange={handleChange}
          name="priority"
          id="priority"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>

        <label htmlFor="contactMethod">Contact Method: </label>
        <select
          value={formData.contactMethod}
          onChange={handleChange}
          name="contactMethod"
          id="contactMethod"
        >
          <option value="Message">Ticket Replay</option>
          <option value="Phone">Phone</option>
        </select>

        <label htmlFor="images">Upload Images: </label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        <button>Create Ticket</button>
      </form>
    </div>
  );
}

export default CreateTicket;