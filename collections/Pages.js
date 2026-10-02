import { makeSlugField } from "./slug.js";

export const Pages = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
  },
  access: {
    read: () => false, // nog niet publiek gerenderd; fundatie voor /services-uitwerking e.d.
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Titel",
    },
    makeSlugField("title"),
    {
      name: "content",
      type: "richText",
      required: true,
      label: "Inhoud",
    },
  ],
};
