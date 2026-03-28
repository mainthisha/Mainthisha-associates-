const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "Something went wrong");
  }
  return data;
}

export const registrationApi = {
  registerIndividual: (eventId, payload) =>
    request(`/api/registrations/${eventId}/individual`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  registerTeam: (eventId, payload) =>
    request(`/api/registrations/${eventId}/team`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  checkRegistration: (eventId, email) =>
    request(`/api/registrations/${eventId}/check?email=${encodeURIComponent(email)}`),

  getEventRegistrations: (eventId) =>
    request(`/api/registrations/${eventId}`),
};