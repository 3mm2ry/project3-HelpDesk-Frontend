import { useState } from "react";
import { useNavigate } from "react-router";
import { createLocation } from "../../services/locationServices";

function CreateLocation() {
  const [formData, setFormData] = useState({
    building: "Main Office",
    floor: "0",
    officeNumber: "",
    deskNumber: "",
    x: "",
    y: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const locationData = {
        building: formData.building,
        floor: Number(formData.floor),
        officeNumber: formData.officeNumber,
        deskNumber: formData.deskNumber,
        coordinates: {
          x: Number(formData.x),
          y: Number(formData.y),
        },
      };

      await createLocation(locationData);
      navigate("/locations");
    } catch (err) {
      setError(err.response.data.error);
    }
  }

  return (
    <div>
      <h1>Create Location</h1>
      <p className="error">{error}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="building">Building:</label>
        <input
          type="text"
          value={formData.building}
          onChange={handleChange}
          name="building"
          id="building"
          required
        />

        <label htmlFor="floor">Floor:</label>
        <select
          value={formData.floor}
          onChange={handleChange}
          name="floor"
          id="floor"
        >
          <option value="0">Ground</option>
          <option value="1">First</option>
          <option value="2">Second</option>
        </select>

        <label htmlFor="officeNumber">Office:</label>
        <input
          type="text"
          value={formData.officeNumber}
          onChange={handleChange}
          name="officeNumber"
          id="officeNumber"
          placeholder="008 - Finance"
          required
        />

        <label htmlFor="deskNumber">Desk:</label>
        <input
          type="text"
          value={formData.deskNumber}
          onChange={handleChange}
          name="deskNumber"
          id="deskNumber"
        />

        <label htmlFor="x">X (%):</label>
        <input
          type="number"
          value={formData.x}
          onChange={handleChange}
          name="x"
          id="x"
          min="0"
          max="100"
          required
        />

        <label htmlFor="y">Y (%):</label>
        <input
          type="number"
          value={formData.y}
          onChange={handleChange}
          name="y"
          id="y"
          min="0"
          max="100"
          required
        />

        <button>Create Location</button>
        <button type="button" onClick={() => navigate("/locations")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateLocation;
