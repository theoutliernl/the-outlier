// Payload CMS configuratie — The Outlier
// CMS-fundatie etappe 4: blog + (toekomstige) pagina's, Postgres-adapter op Supabase.
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users.js";
import { Posts } from "./collections/Posts.js";
import { Pages } from "./collections/Pages.js";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: import.meta.dirname,
    },
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { autoType: false },
  telemetry: false,
  editor: lexicalEditor(),
  collections: [Users, Posts, Pages],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    // Schema-push alleen expliciet aanzetten (one-off, lokaal draaien).
    // Op Vercel-builds is dit uit: schema wordt eenmalig gepusht via migration-run.
    push: process.env.PAYLOAD_DB_PUSH === "true",
    prodMigrations: false,
  }),
});
