import api from "./api";

export async function getAllDepartments() {
  const response = await api.get("/departments");
  return response.data;
}

export async function getDepartmentById(departmentId) {
  const response = await api.get(`/departments/${departmentId}`);
  return response.data;
}

export async function getDepartmentUsers(departmentId) {
  const response = await api.get(`/departments/${departmentId}/users`);
  return response.data;
}

export async function createDepartment(newDepartment) {
  const response = await api.post("/departments", newDepartment);
  return response.data;
}

export async function updateDepartment(departmentId, updatedDepartment) {
  const response = await api.put(`/departments/${departmentId}/edit`, updatedDepartment);
  return response.data;
}

export async function deleteDepartment(departmentId) {
  const response = await api.delete(`/departments/${departmentId}/delete`);
  return response.data;
}
