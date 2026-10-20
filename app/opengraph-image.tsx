import { OG_SIZE, renderOgImage } from "./components/og-image";

export const alt = "GradeBridge — copy grades into PowerSchool in two clicks";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "For PowerSchool teachers",
    headline: "Move grades into PowerSchool in two clicks",
  });
}
