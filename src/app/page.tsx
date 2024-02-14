import Link from "next/link";
import { apiGetAuthUser } from "~/lib/api-requests";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const user = await apiGetAuthUser(token?.value);
  return (
    <main>
      <h1>My Main home</h1>
      <Link href="/home">Onboarding</Link>
    </main>
  );
}
