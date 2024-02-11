import Image from "next/image";
import { redirect } from "next/navigation";

import { products } from "~/lib/products";

export default function Home() {
  return redirect("/onboarding");
}
