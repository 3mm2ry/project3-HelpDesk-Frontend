import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getLocationById,
  updateLocation,
} from "../../services/locationServices";

function EditLocation() {
  const [formData, setFormData] = useState({
    building: "",
    floor: "0",
    officeNumber: "",
    deskNumber: "",
    x: "",
    y: "",
  });
  const [error, setError] = useState("");

  const { locationId } = useParams();
  const navigate = useNavigate();

  async function loadLocation() {
    const response = await getLocationById(locationId);
    setFormData({
      building: response.building,
      floor: String(response.floor),
      officeNumber: response.officeNumber || "",
      deskNumber: response.deskNumber || "",
      x: response.coordinates.x,
      y: response.coordinates.y,
    });
  }

  useEffect(() => {
    loadLocation();
  }, []);

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

      await updateLocation(locationId, locationData);
      navigate(`/locations/${locationId}`);
    } catch (err) {
      setError(err.response.data.error);
    }
  }

  return (
    <div>
      <h1>Edit Location</h1>
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

        <button>Update Location</button>
        <button
          type="button"
          onClick={() => navigate(`/locations/${locationId}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditLocation;
