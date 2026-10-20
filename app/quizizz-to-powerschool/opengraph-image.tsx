import { OG_SIZE, renderOgImage } from "../components/og-image";

export const alt = "How to transfer Quizizz (Wayground) grades to PowerSchool";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "Guide",
    headline: "Transfer Quizizz (Wayground) grades to PowerSchool",
  });
}
