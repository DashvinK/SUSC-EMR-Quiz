// Central SUSC EMR application form link.
//
// Paste the live Google Form URL here — the "Apply now" buttons across the site
// use it. Leave it as "" and those buttons show a disabled "Applications opening
// soon" state until you set it.
//
// If you later get department-specific pre-filled links (e.g. a Google Form with
// the department pre-selected), set `applyLink` on that department in
// src/data/departments.js — a per-department link takes precedence over this one.
export const EMR_FORM_URL = "";

// Resolve the apply link for a department: its own link, else the central form.
export function applyLinkFor(department) {
  return department?.applyLink || EMR_FORM_URL || "";
}
