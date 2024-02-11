import Link from "next/link";

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { api } from "~/trpc/server";

export default async function Home() {
  const clerkUser = await currentUser();
  const currentLoginUser = await api.user.getCurrentUser.query({
    id: clerkUser!.id,
  });

  // console.log("current login user", currentLoginUser);

  // if (!currentLoginUser?.isCompleted) {
  //   router.push("/home/pre-login?purpose=onboarding");
  // }
  return (
    <div>
      <Link href="/home/pre-login?purpose=onboarding">
        Go to onboarding page
      </Link>
      <br />
      <Link href="/">Go to home page</Link>
    </div>
  );
}
