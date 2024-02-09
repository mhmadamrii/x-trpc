import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="h-screen grid place-items-center">{children}</main>;
}
