import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  } else {
    redirect("/home");
  }

  return (
    <main>
      <h1>My Main home</h1>
      <Link href="/home">Onboarding</Link>
    </main>
  );
}
