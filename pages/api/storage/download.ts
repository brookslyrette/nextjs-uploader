import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";
import { APIError } from "../../../lib/model/model";
import { getFile } from "../../../lib/service/storage";

// redirect to secure download URL
export default async function handler(req: NextApiRequest, res: NextApiResponse<APIError>) {
  const session = await getSession({ req })
  if (session) {
    if (session.user.role !== "support") {
      res.status(403).json({
        message: "Forbidden"
      })
      return
    }
  } else {
    res.status(401).json({
      message: "Unauthorized"
    })
    return
  }

  const filename = req.query.filename as string;
  if (!filename) {
    res.status(401).json({
      message: "Bad Request: `filename` is required"
    })
    return
  }

  try {
    const url = await getFile(filename)
    res.redirect(url.toString())
  }
  catch {
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}
