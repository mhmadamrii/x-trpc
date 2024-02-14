import { z } from "zod";
import { compare, hash } from "bcryptjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getEnvVariable, getErrorResponse } from "~/lib/helpers";
import { signJWT } from "~/lib/token";
import { NextResponse } from "next/server";

export const userRouter = createTRPCRouter({
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

  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user: any = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user || !(await compare(input.password, user.password))) {
        console.log("invalid credentials");
        return getErrorResponse(401, "Invalid email or password");
      }

      const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");
      console.log(JWT_EXPIRES_IN);

      const token = await signJWT(
        { sub: user.id },
        { exp: `${JWT_EXPIRES_IN}m` },
      );
      console.log("token", token);

      const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
      const cookieOptions = {
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        maxAge: tokenMaxAge,
      };

      const response = new NextResponse(
        JSON.stringify({
          status: "success",
          token,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );

      await Promise.all([
        response.cookies.set(cookieOptions),
        response.cookies.set({
          name: "logged-in",
          value: "true",
          maxAge: tokenMaxAge,
        }),
      ]);
      console.log("shitt", response);

      return response;
    }),

  createUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        username: z.string(),
        email: z.string(),
        imageUrl: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await hash(input.password, 12);
      console.log("hashed pwd", hashedPassword);
      return ctx.db.user.create({
        data: {
          id: input.id,
          name: input.name,
          username: input.username,
          email: input.email,
          imageUrl: input.imageUrl,
          password: hashedPassword,
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
