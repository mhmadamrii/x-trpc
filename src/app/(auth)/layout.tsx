import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen grid place-items-center">
      <div className="">
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
      {children}
    </main>
  );
}
