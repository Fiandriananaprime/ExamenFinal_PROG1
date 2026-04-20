import { useSyncExternalStore } from "react";

export function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;

  const trimmed = str.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf("");
  const cut = lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed;
  return cut + "...";
}

export function countWords(str) {
  return str.trim().split(/\s+/).length;
}

export function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
