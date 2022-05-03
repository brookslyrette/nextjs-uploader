import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";
import { APIError, FileList } from "../../../lib/model/model";
import { getFiles } from "../../../lib/service/storage";

// Return the list of files in the bucket
export default async function handler(req: NextApiRequest, res: NextApiResponse<FileList | APIError>) {
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

  if (req.method !== "GET") {
    res.status(405).json({
      message: "Method Not Allowed"
    })
    return
  }

  try {
    const files = await getFiles()
    files.sort((a, b) => a.lastModified > b.lastModified ? -1 : 1)
    res.status(200).json(files)
  }
  catch {
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}
