export const INSTAGRAM_HANDLE = "@gdgoc.ugm";
export const instagramUrl = (handle: string = INSTAGRAM_HANDLE) =>
  `https://www.instagram.com/${handle.replace(/^@/, "")}/`;

// The API has no YouTube field – change this to the community channel URL.
export const YOUTUBE_URL = "https://www.youtube.com/results?search_query=GDGoC+UGM";

export const FALLBACK_TAGLINE = "Learn together. Build together.";
