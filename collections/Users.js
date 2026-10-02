import { slugField } from "./slug.js";

export const Users = {
  slug: "users",
  auth: {
    // E-mail + wachtwoord auth (Payload standaard). Eerste admin via
    // /admin/create-first-user — daarna is signup dicht (geen publieke routes).
    tokenExpiration: 8 * 60 * 60, // 8 uur
    maxLoginAttempts: 10,
    lockTime: 10 * 60 * 1000,
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "roles"],
  },
  access: {
    // Geen publieke signup: user-create alleen als er nog géén users zijn
    // (Payload first-register) of door een ingelogde admin.
    create: async ({ req }) => {
      const { totalDocs } = await req.payload.count({ collection: "users", overrideAccess: true });
      return totalDocs === 0 || Boolean(req.user?.roles?.includes("admin"));
    },
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "name", type: "text", label: "Naam" },
    {
      name: "roles",
      type: "select",
      defaultValue: ["admin"],
      hasMany: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        // alleen admins mogen rollen zetten
        update: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
      },
    },
  ],
};
