/* THIS FILE IS GENERATED FROM payload.config — DO NOT MODIFY */
import { NotFoundPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "@payloadcms/next/views";
import configPromise from "@payload-config";

export const generateMetadata = ({ params }) =>
  generatePageMetadata({ config: configPromise, params });

export default NotFoundPage;
