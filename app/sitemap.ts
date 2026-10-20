import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/google-classroom-to-powerschool", priority: 0.9 },
  { path: "/pricing", priority: 0.7 },
  { path: "/support", priority: 0.5 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
