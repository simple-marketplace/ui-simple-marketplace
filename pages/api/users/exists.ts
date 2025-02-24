import type { NextApiRequest, NextApiResponse } from "next";

type Result = {
  UserExists: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>,
) {
  const { username } = req.query;

  let response: any = await fetch(
    `http://localhost:8080/users?username=${username}`,
    {
      method: "GET",
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch product (Status: ${response.status})`);
  }

  response = await response.json();

  console.log(response);

  const result: Result = {
    UserExists: response.UserExists,
  };

  res.status(200).json(result);
}
