import api from "./api";

export async function getAllAssets() {
  const response = await api.get("/assets");
  return response.data;
}

export async function getAssetById(assetId) {
  const response = await api.get(`/assets/${assetId}`);
  return response.data;
}

export async function createAsset(newAsset) {
  const response = await api.post("/assets", newAsset);
  return response.data;
}

export async function updateAsset(assetId, updatedAsset) {
  const response = await api.put(`/assets/${assetId}/edit`, updatedAsset);
  return response.data;
}

export async function deleteAsset(assetId) {
  const response = await api.delete(`/assets/${assetId}/delete`);
  return response.data;
}

export async function borrowAsset(assetId, expectedReturnDate) {
  const response = await api.post(`/assets/${assetId}/borrow`, {
    expectedReturnDate,
  });
  return response.data;
}

export async function cancelBorrow(assetId) {
  const response = await api.put(`/assets/${assetId}/cancel`);
  return response.data;
}
export async function approveBorrow(assetId) {
  const response = await api.put(`/assets/${assetId}/approve`);
  return response.data;
}
export async function rejectBorrow(assetId) {
  const response = await api.put(`/assets/${assetId}/reject`);
  return response.data;
}
export async function returnAsset(assetId) {
  const response = await api.put(`/assets/${assetId}/return`);
  return response.data;
}
