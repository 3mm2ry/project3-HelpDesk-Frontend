import api from "./api";

export async function getMyProfile() {
  const response = await api.get("/users/me");
  return response.data;
}
