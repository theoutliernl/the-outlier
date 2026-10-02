/* Admin not-found — Payload 3.9x shape. */
import configPromise from "@payload-config";
import { generatePageMetadata, NotFoundPage } from "@payloadcms/next/views";
import { importMap } from "../importMap";

export const generateMetadata = ({ params }) =>
  generatePageMetadata({ config: configPromise, params });

export default async function NotFound(props) {
  return NotFoundPage({
    config: configPromise,
    importMap,
    params: props.params,
    searchParams: props.searchParams,
  });
}
