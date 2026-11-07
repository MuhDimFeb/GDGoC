import { instagramUrl } from "./links";
import type { NavItem } from "./types";
import { useEndpoint } from "./useEndpoint";
import type { Target } from "../components/ui";

// Shown while /navigation loads (and if it fails) so the header never jumps.
export const FALLBACK_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Overview", href: "/overview" },
  { label: "Contact", href: "/contact" },
];

export function useNavItems(): NavItem[] {
  const { state } = useEndpoint<NavItem[]>("/navigation");
  return state.status === "success" ? state.data : FALLBACK_NAV;
}

/**
 * This site only ships the Landing and About pages, so the other two API links
 * go somewhere useful instead of a dead route:
 *   /overview → the learning tracks section on the landing page
 *   /contact  → the community's Instagram
 */
export function resolveNav(href: string): Target {
  if (href === "/overview") return { to: "/#tracks" };
  if (href === "/contact") return { href: instagramUrl() };
  return { to: href };
}
