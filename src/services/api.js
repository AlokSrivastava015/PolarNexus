// In local development this relative URL is forwarded to FastAPI by Vite.
// Deployments may override it with VITE_API_BASE_URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("polarnexus_access_token");
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    });
  } catch {
    throw new Error(`Unable to reach the PolarNexus API at ${API_BASE_URL}. Start the backend and check backend/.env.`);
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail || `Request failed (${response.status})`);
  }
  return response.status === 204 ? null : response.json();
}

export async function login(username_or_email, password) {
  const result = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ username_or_email, password }) });
  localStorage.setItem("polarnexus_access_token", result.access_token);
  return result.user;
}

export async function signup(payload) {
  const result = await apiFetch("/auth/signup", { method: "POST", body: JSON.stringify(payload) });
  localStorage.setItem("polarnexus_access_token", result.access_token);
  return result.user;
}
