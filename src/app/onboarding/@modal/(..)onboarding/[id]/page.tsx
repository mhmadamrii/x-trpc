"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function InterceptorOnboarding() {
  const router = useRouter();
  return (
    <>
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <form className="flex flex-col gap-2">
              <Input type="email" placeholder="Email" className="my-2" />
              <Input type="email" placeholder="Email" className="my-2" />
            </form>
            <Button onClick={() => router.back()}>Ok</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
