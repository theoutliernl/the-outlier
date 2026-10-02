import { makeSlugField } from "./slug.js";

export const Posts = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt", "author"],
    livePreview: undefined,
  },
  versions: { drafts: true },
  access: {
    read: ({ req: { user } }) =>
      // publiek: alleen gepubliceerde posts (via draft-status _status check)
      Boolean(user) || { or: [{ _status: { equals: "published" } }] },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Titel",
      admin: { description: "Koptitel van het artikel (H1 op de detailpagina)." },
    },
    makeSlugField("title"),
    {
      name: "publishedAt",
      type: "date",
      label: "Publicatiedatum",
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "Auteur",
      admin: { position: "sidebar" },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Samenvatting",
      maxLength: 320,
      admin: { description: "Kort intro voor de blog-index en meta-description." },
    },
    {
      name: "coverImage",
      type: "text",
      label: "Cover-afbeelding (URL)",
      admin: {
        description:
          "Directe URL naar de cover (bijv. Supabase Storage / CDN). Bewust geen upload-collectie: Vercel heeft geen persistent filesystem.",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: "Inhoud",
    },
  ],
};
