import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";
import { APIError, FileUploadDetails } from "../../../lib/model/model";
import { getUploadURL } from "../../../lib/service/storage";

// Return a url and form details for a file upload
export default async function handler(req: NextApiRequest, res: NextApiResponse<FileUploadDetails | APIError>) {
  const session = await getSession({ req })
  if (session) {
    if (session.user.role !== "customer") {
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

  if (req.method !== "POST") {
    res.status(405).json({
      message: "Method Not Allowed"
    })
    return
  }

  const filename = req.query.filename as string;
  if (!filename) {
    res.status(401).json({
      message: "Bad Request: `filename` is required"
    })
    return
  } else if (!filename.endsWith(".tgz")) {
    res.status(401).json({
      message: "Bad Request: Only *.tgz files are supported"
    })
    return
  }

  try {
    const details = await getUploadURL(filename)
    res.status(200).json(details)
  }
  catch (e) {
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}
