


import { Category } from "@/app/type/type";
import React from "react";

export const instant = false;
const productDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${productId}`); 
  const oneProduct: Category = await res.json();
  console.log(oneProduct);
  return (
    <div>
      <h2> Product Details Page</h2>
      <p>Product ID: {productId}</p>
    </div>
  );
};

export default productDetailsPage;
