import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }
  // Log result recieved
  console.log("New Wizard generated JSON recieved", req.body)

  // Simulate processing delay
  const delay = Math.floor(Math.random() * (1200 - 800 + 1)) + 800
  await new Promise((resolve) => setTimeout(resolve, delay))

  // Echo the received JSON with additional metadata
  const response = {
    ...req.body,
    echoedAt: new Date().toISOString(),
    serverMock: true,
  }

  res.status(200).json(response)
}
