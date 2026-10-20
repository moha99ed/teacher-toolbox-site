import { OG_SIZE, renderOgImage } from "../components/og-image";

export const alt = "Try GradeBridge without installing";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "Interactive demo",
    headline: "Try GradeBridge without installing",
  });
}
