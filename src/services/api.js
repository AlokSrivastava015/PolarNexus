const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("polarnexus_access_token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || "Request failed");
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
