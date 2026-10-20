import { OG_SIZE, renderOgImage } from "../components/og-image";

export const alt = "GradeBridge for schools and districts";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "For schools & districts",
    headline: "Student grades stay in the teacher's browser",
  });
}
