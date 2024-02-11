"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { products } from "~/lib/products";
import { Button } from "~/components/ui/button";

export default function InterceptorPhotoFeed({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(true);
  const product = products.find(
    (product) => product.id === parseInt(params.id),
  );

  const handleBack = (): void => {
    router.back();
    // router.push("/photo-feed");
    setOpenModal(false);
  };
  return (
    <Dialog open={openModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe,
              velit illum. Tempora voluptate, quod mollitia in ea impedit id
              odit voluptatum optio? Doloremque quod nihil odit delectus
              aperiam, suscipit magni?
            </span>
            <Image
              // @ts-ignore
              src={product?.imageSrc}
              alt="some images"
              width={400}
              height={400}
            />
            <Button onClick={handleBack}>Back</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
