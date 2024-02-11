"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Topbar({ user }: { user: any }) {
  const router = useRouter();
  const infoLogger = () => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (!user.isCompleted) {
        router.push(`/home/pre-login?purpose=onboarding&id=${user?.id}`);
      } else {
        infoLogger();
      }
    }, 2000);
  }, []);

  return (
    <nav>
      <h1>Hello world</h1>
    </nav>
  );
}
