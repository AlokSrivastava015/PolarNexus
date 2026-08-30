// In local development this relative URL is forwarded to FastAPI by Vite.
// Deployments may override it with VITE_API_BASE_URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("polarnexus_access_token");
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  console.debug("[PolarNexus API] request", { path, method: options.method || "GET", body: isFormData ? "FormData" : options.body });
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("[PolarNexus API] network error", { path, error });
    throw new Error(`Unable to reach the PolarNexus API at ${API_BASE_URL}. Start the backend and check backend/.env.`);
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    console.error("[PolarNexus API] error response", { path, status: response.status, body });
    const messages = {
      400: "The request could not be processed.",
      401: "Your session has expired. Please sign in again.",
      403: "You do not have permission to use this AI action.",
      404: "The requested resource was not found.",
      422: "Please check the required inputs and try again.",
      500: "The server encountered an error. Please try again.",
    };
    throw new Error(body?.detail || messages[response.status] || `Request failed (${response.status})`);
  }
  const data = response.status === 204 ? null : await response.json();
  console.debug("[PolarNexus API] response", { path, status: response.status, data });
  return data;
}

export function summarizeFile(file, options = {}) {
  const form = new FormData();
  form.append("file", file);
  form.append("summary_length", options.summaryLength || "medium");
  form.append("summary_type", options.summaryType || "general");
  form.append("focus_area", options.focusArea || "all");
  form.append("language", options.language || "English");
  return apiFetch("/ai/summarize", { method: "POST", body: form });
}

export function generateAiContent(payload) {
  return apiFetch("/ai/content/generate", { method: "POST", body: JSON.stringify(payload) });
}

export function runResourceAiAction(payload) {
  return apiFetch("/ai/resource-action", { method: "POST", body: JSON.stringify(payload) });
}

export function translateAiContent(payload) {
  return apiFetch("/ai/translate", { method: "POST", body: JSON.stringify(payload) });
}

export async function downloadFile(url, filename) {
  if (!url) return false;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Download failed (${response.status})`);
    const blobUrl = URL.createObjectURL(await response.blob());
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 0);
    return true;
  } catch {
    // Some external hosts do not allow browser fetches; preserve a direct download attempt.
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    return false;
  }
}

export async function downloadTextFile(content, filename, mimeType = "text/plain") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
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
