export const SITE_URL = "https://gradebridge.support";
export const SITE_NAME = "GradeBridge";
export const EXTENSION_ID = "olhkjgbdgjekbpkchieibbhnhmkplknd";
export const CHROME_STORE_URL = `https://chromewebstore.google.com/detail/${EXTENSION_ID}`;
export const SUPPORT_EMAIL = "gradebridgesupport@gmail.com";

export const SOURCE_PLATFORMS = [
  { name: "Google Classroom", href: "/google-classroom-to-powerschool" },
  { name: "DeltaMath", href: "/deltamath-to-powerschool" },
  { name: "Quizizz / Wayground", href: "/quizizz-to-powerschool" },
  { name: "Schoology", href: "/schoology-to-powerschool" },
  { name: "Google Sheets", href: "/google-sheets-to-powerschool" },
  { name: "AP Classroom", href: "/ap-classroom-to-powerschool" },
  { name: "Gradient (GradeCam)", href: "/gradient-to-powerschool" },
] as const;
