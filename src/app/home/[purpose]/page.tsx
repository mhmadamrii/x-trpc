import Link from "next/link";

export default function OnboardingUserId({
  params,
}: {
  params: { purpose: string };
}) {
  console.log("params onboarding user", params);
  return (
    <main>
      <h1>Hello world</h1>
      <h1>I am not an interceptor</h1>
      <Link href="/">Back to /</Link>
    </main>
  );
}
