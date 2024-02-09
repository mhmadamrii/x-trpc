import OnboardingUser from "~/components/shared/on-boarding";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Onboarding() {
  const clerkUser = await currentUser();
  const currentLoginUserData = await api.user.getCurrentUser.query({
    id: clerkUser!.id,
  });

  const mapUser = {
    id: clerkUser?.id,
    imageUrl: clerkUser?.imageUrl,
    name: "",
    username: clerkUser?.username!.toLowerCase(),
    email:
      clerkUser?.emailAddresses[0]?.emailAddress ??
      "unidentifieduser@gmail.com",
    bio: "",
  };

  // const createUser = await api.user.createUser.useMutation({
  //   onSuccess: (res: any) => {
  //     console.log(res);
  //   },
  //   // // @ts-ignore
  //   // id: clerkUser?.id,
  //   // name: "unknown",
  //   // isCompleted: false,
  //   // bio: "",
  //   // email:
  //   //   clerkUser?.emailAddresses[0]?.emailAddress ??
  //   //   "unidentifieduser@gmail.com",
  //   // // @ts-ignore
  //   // imageUrl: clerkUser?.imageUrl,
  //   // // @ts-ignore
  //   // username: clerkUser?.username!.toLowerCase(),
  // });

  if (!currentLoginUserData) {
  }

  return (
    <main>
      <div>Onboarding page</div>
      <div>Onboarding page</div>
      <div>Onboarding page</div>
      <div>Onboarding page</div>
      <div>Onboarding page</div>
      <div>Onboarding page</div>
      <OnboardingUser initialValues={mapUser} />
    </main>
  );
}
