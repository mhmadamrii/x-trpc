import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import Anything from "./_components/anything";
import Image from "next/image";
import { products } from "~/lib/products";
import Link from "next/link";

export default async function Home() {
  const clerkUser = await currentUser();
  const currentLoginUser = await api.user.getCurrentUser.query({
    // @ts-ignore
    id: clerkUser?.id,
  });

  console.log("current login user", currentLoginUser);

  if (!clerkUser) {
    redirect("/join");
  }

  return (
    <main>
      <h1>Hello world</h1>
      <Anything />
      <div className="grid grid-cols-1 mt-24 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group"
          >
            <div className="aspect-h-1 aspect-w-1 hover:ring-gray-300 cursor-pointer ring ring-gray-100 ring-offset-4 w-full overflow-hidden rounded-lg bg-slate-200 xl:aspect-h-8 xl:aspect-w-7">
              <Image
                width={500}
                height={500}
                src={product.imageSrc}
                alt={product.name}
                className="object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-7d00">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {product.price}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
