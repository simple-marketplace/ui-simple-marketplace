import type { NextApiRequest, NextApiResponse } from "next";

type Product = {
  ID: string;
  Name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>,
) {
  const { name } = req.query;
  let response = await fetch(
    `http://localhost:8080/products/search?name=${name}`,
    {
      method: "GET",
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch product (Status: ${response.status})`);
  }

  response = await response.json();
  const products: Product[] = response.map((obj) => ({
    ID: obj.ID,
    Name: obj.Name,
  }));

  res.status(200).json(products);
}
