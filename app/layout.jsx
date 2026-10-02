import React from "react";
// ROOT layout — minimaal. Site-layout staat in (frontend)/layout.jsx,
// admin-layout in (payload)/layout.jsx zodat globals.css niet in /admin lekt.
export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
