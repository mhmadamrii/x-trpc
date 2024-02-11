import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getCurrentUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  createUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        username: z.string(),
        imageUrl: z.string(),
        email: z.string(),
        isCompleted: z.boolean(),
        bio: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        // @ts-ignore
        data: {
          name: input.name,
          username: input.username,
          email: input.email,
          imageUrl: input.imageUrl,
          isCompleted: input.isCompleted,
          bio: input.bio,
          id: input.id,
        },
      });
    }),

  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        isCompleted: z.boolean(),
        bio: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input id", input.id);
      return ctx.db.user.update({
        where: {
          id: input.id,
        },
        // @ts-ignore
        data: {
          bio: input.bio,
          isCompleted: input.isCompleted,
        },
      });
    }),
});
