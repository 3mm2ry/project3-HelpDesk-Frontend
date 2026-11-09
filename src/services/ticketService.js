// First thing you do in service is import the api
import api from "./api";

// Create a new ticket
export async function createNewTicket(newTicket) {
  const response = await api.post("/tickets", newTicket);
  return response.data;
}

// Get All Tickets
export async function getAllTickets() {
  const response = await api.get("/tickets");
  return response.data;
}

// Get Ticket by ID
export async function getTicketById(ticketId) {
  const response = await api.get(`/tickets/${ticketId}`);
  return response.data;
}

// Update Ticket
export async function updateTicketById(ticketId, updatedTicket) {
  const response = await api.put(
    `/tickets/${ticketId}/edit`,
    updatedTicket
  );
  return response.data;
}

// Delete Ticket
export async function deleteTicketById(ticketId) {
  const response = await api.delete(`/tickets/${ticketId}/delete`);
  return response.data;
}