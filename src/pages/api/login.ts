import type { NextApiRequest, NextApiResponse } from "next"
import { Magic } from "@magic-sdk/admin"

type ResponseData =
  | {
      authenticated: boolean
    }
  | {
      error: string
    }

export default function post(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const magic = new Magic(process.env.MAGIC_SECRET_KEY as string)

  try {
    console.log("authenticating")
    const didToken = req.headers.authorization?.substr(7)
    if (!didToken) {
      throw new Error("Authorization header is missing")
    }

    magic?.token.validate(didToken)
    // do whatever custom user logic you need - e.g. save session data, etc.

    res.status(200).json({ authenticated: true })
  } catch (error) {
    console.log("Server Error: ", res.status(200))
    res.status(500).json({ error: (error as Error).message })
  }
}
