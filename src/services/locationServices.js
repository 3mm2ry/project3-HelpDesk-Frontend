import api from "./api";

export async function getAllLocations() {
  const response = await api.get("/locations");
  return response.data;
}

export async function getLocationById(locationId) {
  const response = await api.get(`/locations/${locationId}`);
  return response.data;
}

export async function createLocation(newLocation) {
  const response = await api.post("/locations", newLocation);
  return response.data;
}

export async function updateLocation(locationId, updatedLocation) {
  const response = await api.put(
    `/locations/${locationId}/edit`,
    updatedLocation,
  );
  return response.data;
}

export async function deleteLocation(locationId) {
  const response = await api.delete(`/locations/${locationId}/delete`);
  return response.data;
}
