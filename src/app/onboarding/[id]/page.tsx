import Image from "next/image";
import Link from "next/link";

import { Input } from "~/components/ui/input";
import { products } from "~/lib/products";

export default function Home() {
  return (
    <main>
      <Link href="/onboarding/11">GOOOO</Link>
      <Input type="email" placeholder="Email" />
      <Input type="email" placeholder="Email" />
    </main>
  );
}
