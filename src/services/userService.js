import api from "./api";

export async function getAllUsers() {
  const response = await api.get("/users");
  return response.data;
}

export async function getUserById(userId) {
  const response = await api.get(`/users/${userId}`);
  return response.data;
}

export async function updateUser(userId, updatedUser) {
  const response = await api.put(`/users/${userId}/edit`, updatedUser);
  return response.data;
}

export async function deleteUser(userId) {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
}
