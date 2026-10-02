// Gedeelde velden voor Payload collections (JS, geen TS).
export function slugField() {
  return {
    type: "group",
    name: "slugField",
    fields: [],
    hidden: true,
  };
}

// Simpele slug-field met auto-generatie uit een bronveld.
export function makeSlugField(sourceField = "title") {
  return {
    name: "slug",
    type: "text",
    label: "Slug",
    index: true,
    unique: true,
    admin: {
      position: "sidebar",
      description: "URL-segment: /blog/<slug>. Laat leeg voor auto-generatie uit titel.",
    },
    hooks: {
      beforeValidate: [
        async ({ value, data, operation }) => {
          let base = value;
          if (!base && data && data[sourceField]) base = data[sourceField];
          if (!base) return value;
          return String(base)
            .toLowerCase()
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 90);
        },
      ],
    },
    validate: (value) => {
      if (!value) return "Slug is verplicht.";
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) return "Slug mag alleen kleine letters, cijfers en streepjes bevatten.";
      return true;
    },
  };
}
