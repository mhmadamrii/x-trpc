import Link from "next/link";

export default async function Home() {
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
