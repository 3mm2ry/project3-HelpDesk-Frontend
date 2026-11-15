
import api from "./api";

// Get Comments
export async function getComments(ticketId) {
  const response = await api.get(`/comments?ticket=${ticketId}`);
  return response.data;
}

// Create Comment
export async function createComment(newComment) {
  const response = await api.post("/comments", newComment);
  return response.data;
}

// Update Comment
export async function updateComment(commentId, updatedComment) {
  const response = await api.put(
    `/comments/${commentId}/edit`,
    updatedComment
  );
  return response.data;
}

// Delete Comment
export async function deleteComment(commentId) {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
}
