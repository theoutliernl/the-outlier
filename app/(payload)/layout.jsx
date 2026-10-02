/* THIS FILE IS GENERATED FROM payload.config — DO NOT MODIFY */
import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap";
import "./custom.scss";

const serverFunction = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }) => (
  <React.Fragment>
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  </React.Fragment>
);

export default Layout;
