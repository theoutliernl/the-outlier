/* Admin root page — Payload 3.9x shape (RootPage is een gewone async component). */
import configPromise from "@payload-config";
import { RootPage } from "@payloadcms/next/views";
import { importMap } from "../importMap";

export default async function Page(props) {
  return RootPage({
    config: configPromise,
    importMap,
    params: props.params,
    searchParams: props.searchParams,
  });
}
