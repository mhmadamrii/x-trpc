import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function LayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkUser = await currentUser();
  console.log("clerk user", clerkUser);

  return <section>{children}</section>;
}
