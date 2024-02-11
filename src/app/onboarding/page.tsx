"use client";

import React from "react";
import Link from "next/link";

import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const user = false;

  React.useEffect(() => {
    if (!user) {
      setTimeout(() => {
        console.log("hello");
        router.push("/onboarding/111");
      }, 1000);
    }
  }, []);

  return (
    <main>
      <Link href="/onboarding/111">GOOOOOOOOOOOOOOOOOOOOOO</Link>
      <Input type="email" placeholder="Email" />
      <Input type="email" placeholder="Email" />
    </main>
  );
}
