"use client";
import Button from "@/app/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderBy } from "@/app/types";

type OrderByButtonProps = {
  orderBy: OrderBy;
};

export default function OrderByButton({ orderBy }: OrderByButtonProps) {
  const currentOrderBy = useSearchParams().get("order_by") || "desc";
  const router = useRouter();

  const handleClick = () => {
    const sp = new URLSearchParams();
    sp.set("order_by", orderBy);
    router.push(`?${sp.toString()}`);
  };

  return (
    <Button disabled={currentOrderBy === orderBy} onClick={handleClick}>
      Order by {orderBy}
    </Button>
  );
}
