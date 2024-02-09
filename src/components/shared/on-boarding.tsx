"use client";

import { useId } from "react";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

export default function OnboardingUser({
  initialValues,
}: {
  initialValues: {
    id: string | undefined;
    imageUrl: string | undefined;
    name: string;
    username: string | undefined;
    email: string | undefined;
    bio: string;
  };
}) {
  console.log("initial values", initialValues);
  const idHint = useId();
  const emailHint = useId();

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  const { mutate, isLoading } = api.user.createUser.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("datas", data);
    mutate({
      name: "John Doe",
      bio: "",
      email: emailHint,
      imageUrl: "",
      isCompleted: false,
      username: data.username,
      id: Date.now().toString(),
    });
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>pick id</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} disabled={isLoading} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
}
