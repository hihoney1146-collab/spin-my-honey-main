import { Helmet } from "react-helmet";

/** Leftover keyword/guide URLs that stay live but must leave the index. */
export function NoindexFollow() {
  return <Helmet><meta name="robots" content="noindex, follow" /></Helmet>;
}
