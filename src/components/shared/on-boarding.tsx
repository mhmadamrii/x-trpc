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
  clerkUserData,
}: {
  clerkUserData?: any;
}) {
  console.log(clerkUserData);

  const FormSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    bio: z.string().min(2, {
      message: "Bio must be at least 2 characters",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      bio: "",
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
      bio: "",
      email: clerkUserData?.emailAddresses[0]?.emailAddress,
      id: clerkUserData?.id,
      imageUrl: clerkUserData?.imageUrl,
      isCompleted: false,
      name: clerkUserData?.lastName?.toLowerCase(),
      username: clerkUserData?.username,
    });
  };

  const currentLoginUserData = api.user.getCurrentUser.useQuery({
    id: clerkUserData?.id,
  });

  console.log("ini null", currentLoginUserData.data);

  const handler = () => {
    mutate({
      bio: "",
      email: clerkUserData?.emailAddresses[0]?.emailAddress,
      id: clerkUserData?.id,
      imageUrl: clerkUserData?.imageUrl,
      isCompleted: false,
      name: clerkUserData?.lastName?.toLowerCase(),
      username: clerkUserData?.username,
    });
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
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
          <FormField
            control={form.control}
            name="bio"
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

      <Button onClick={handler}>click</Button>
    </section>
  );
}
