export const API_PORT = "3001";

export const isLocal = window.location.hostname.includes("localhost");

export const API_ENDPOINT = isLocal
  ? `${window.location.protocol}//${window.location.hostname}:${API_PORT}/api`
  : `${window.location.origin}/api`;
