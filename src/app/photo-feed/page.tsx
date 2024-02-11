import Image from "next/image";
import Link from "next/link";

import { products } from "~/lib/products";

export default function PhotoFeed() {
  return (
    <main className="flex gap-2 flex-wrap justify-center w-full border border-slate-800">
      {products.map((productImage, idx) => (
        <div key={idx} className="border rounded-sm">
          <Link
            href={`photo-feed/${productImage.id}`}
            scroll={false}
            className="bg-red-400 border border-red-500"
          >
            <Image
              src={productImage.imageSrc}
              alt={productImage.name}
              width={400}
              height={400}
            />
          </Link>
        </div>
      ))}
    </main>
  );
}
