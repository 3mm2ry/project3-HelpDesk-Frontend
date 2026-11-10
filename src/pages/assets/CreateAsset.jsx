import { useState } from "react";
import { useNavigate } from "react-router";
import { createAsset } from "../../services/assetServices";

function CreateAsset() {
  const [formData, setFormData] = useState({
    assetTag: "",
    name: "",
    category: "",
    serialNumber: "",
    status: "Available",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleImageChange(event) {
    setImages(event.target.files);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const assetData = new FormData();
      assetData.append("assetTag", formData.assetTag);
      assetData.append("name", formData.name);
      assetData.append("category", formData.category);
      assetData.append("serialNumber", formData.serialNumber);
      assetData.append("status", formData.status);

      for (let image of images) {
        assetData.append("images", image);
      }
      await createAsset(assetData);
      // await createAsset(formData);
      navigate("/assets");
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <div>
      <h1>Create Asset</h1>
      <p className="error">{error}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="assetTag">Asset Tag:</label>
        <input
          type="text"
          value={formData.assetTag}
          onChange={handleChange}
          name="assetTag"
          id="assetTag"
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={handleChange}
          name="name"
          id="name"
          required
        />

        <label htmlFor="category">Category:</label>
        <select
          value={formData.category}
          onChange={handleChange}
          name="category"
          id="category"
          required
        >
          <option value="">Select a category</option>
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
          <option value="Monitor">Monitor</option>
          <option value="Printer">Printer</option>
          <option value="Projector">Projector</option>
          <option value="Tablet">Tablet</option>
          <option value="Phone">Phone</option>
          <option value="Accessory">Accessory</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="serialNumber">Serial Number:</label>
        <input
          type="text"
          value={formData.serialNumber}
          onChange={handleChange}
          name="serialNumber"
          id="serialNumber"
        />

        <label htmlFor="status">Status:</label>
        <select
          value={formData.status}
          onChange={handleChange}
          name="status"
          id="status"
        >
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Under Maintenance">Under Maintenance</option>
          <option value="Retired">Retired</option>
        </select>

        <label htmlFor="images">Images (max 5):</label>
        <input
          type="file"
          name="images"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        <button>Create Asset</button>
      </form>
    </div>
  );
}

export default CreateAsset;
