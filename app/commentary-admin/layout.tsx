import { buildMetadata } from "../seo";
import { SeoLayout } from "../seo-layout";

export const metadata = buildMetadata({
  title: "Private Commentary Workspace | Inside MECCA",
  description: "Restricted editorial workspace for de-identifying and reviewing public commentary.",
  path: "/commentary-admin",
  noIndex: true,
});

export default SeoLayout;
