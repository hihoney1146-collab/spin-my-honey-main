import registry from "@/generated/routeLastmod.json";

type Registry = {
  routes: Record<string, { hash: string; lastmod: string }>;
};

const data = registry as Registry;

/** ISO date (YYYY-MM-DD) for visible “Last updated” and sitemap lastmod. */
export function getRouteLastmod(routePath: string): string {
  const key = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return data.routes[key]?.lastmod ?? "2026-07-08";
}
