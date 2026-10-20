import { OG_SIZE, renderOgImage } from "../components/og-image";

export const alt = "How to transfer Gradient (GradeCam) scores to PowerSchool";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "Guide",
    headline: "Transfer Gradient (GradeCam) scores to PowerSchool",
  });
}
