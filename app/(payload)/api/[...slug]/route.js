/* THIS FILE IS GENERATED FROM payload.config — DO NOT MODIFY */
import configPromise from "@payload-config";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";

const _GET = REST_GET(configPromise);
const _POST = REST_POST(configPromise);
const _DELETE = REST_DELETE(configPromise);
const _PATCH = REST_PATCH(configPromise);
const _PUT = REST_PUT(configPromise);
const _OPTIONS = REST_OPTIONS(configPromise);

export { _GET as GET, _POST as POST, _DELETE as DELETE, _PATCH as PATCH, _PUT as PUT, _OPTIONS as OPTIONS };
