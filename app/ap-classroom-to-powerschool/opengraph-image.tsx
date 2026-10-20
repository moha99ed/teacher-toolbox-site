import { OG_SIZE, renderOgImage } from "../components/og-image";

export const alt = "How to transfer AP Classroom scores to PowerSchool";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "Guide",
    headline: "Transfer AP Classroom scores to PowerSchool",
  });
}
