import { getEnvVariable, getErrorResponse } from "~/lib/helpers";
import { prisma } from "~/lib/prisma";
import { signJWT } from "~/lib/token";
// import { LoginUserInput, LoginUserSchema } from "~/lib/validations/user.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface ILoginUser {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ILoginUser;
    // const data = LoginUserSchema.parse(body);
    console.log("body req", body);

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user || !(await compare(body.password, user.password))) {
      return getErrorResponse(401, "Invalid email or password");
    }

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    const token = await signJWT(
      { sub: user.id },
      { exp: `${JWT_EXPIRES_IN}m` },
    );

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

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return getErrorResponse(500, error.message);
  }
}
