import api from "./api";

export async function sendChat(messages) {
  const response = await api.post("/ai/chat", { messages: messages });
  return response.data;
}
