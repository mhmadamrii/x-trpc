"use client";

import Link from "next/link";

export default function Anything() {
  return (
    <main>
      <h1 className="text-4xl">Title</h1>
      <Link href="/product/123">intercept here</Link>
    </main>
  );
}
