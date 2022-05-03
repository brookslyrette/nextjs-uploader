import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { FileList, FileUploadDetails } from "../model/model";

const getS3Client = (): S3Client => {
  if (!process.env.UPLOADER_AWS_ACCESS_KEY_ID || !process.env.UPLOADER_AWS_SECRET_ACCESS_KEY || !process.env.UPLOADER_AWS_S3_BUCKET) {
    throw new Error("Missing AWS configurartion")
  }
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.UPLOADER_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.UPLOADER_AWS_SECRET_ACCESS_KEY,
    }
  })
  return client
}

/**
 * Return the list of files uploaded
 * @returns {Promise<FileList>}
 */
export const getFiles = async (): Promise<FileList> => {
  const client = getS3Client()
  const command = new ListObjectsV2Command({
    Bucket: process.env.UPLOADER_AWS_S3_BUCKET,
  });

  const response = await client.send(command)

  const files = []
  if (response.Contents) {
    for (const obj of response.Contents) {
      if (obj?.Key && obj?.LastModified) {
        files.push({
          name: obj.Key,
          size: obj.Size,
          lastModified: obj.LastModified
        })
      }
    }
  }
  return files
}

/**
 * Given a file get get a signed URL for download. The URL will expire after 10 minutes
 *
 * @param filename name of the file to download
 * @returns URL to download the file
 */
export const getFile = async (filename: string): Promise<URL> => {
  const client = getS3Client()
  const command = new GetObjectCommand({
    Bucket: process.env.UPLOADER_AWS_S3_BUCKET,
    Key: filename
  });

  const url = await getSignedUrl(client, command, { expiresIn: 600 });

  return new URL(url)
}

/**
 * Given a filename, return a URL and a form data object to upload the file
 *
 * @param filename name of the file to upload
 * @returns {Promise<FileUploadDetails>}
 */
export const getUploadURL = async (filename: string): Promise<FileUploadDetails> => {
  if (!process.env.UPLOADER_AWS_S3_BUCKET) {
    throw new Error("Missing AWS bucket configurartion")
  }
  const client = getS3Client()

  // get a random number so file names never collide
  const random = Math.floor(Math.random() * 10**10)
  const p = filename.indexOf('.');
  const generatedFileName = filename.substring(0, p) + '.' + random + filename.substring(p);

  const presignedPost = await createPresignedPost(client, {
    Bucket: process.env.UPLOADER_AWS_S3_BUCKET,
    Key: `${generatedFileName}`,
    Expires: 600,
    Fields: {
      // ensure files are downloaed when accessed from the browser
      'Content-Disposition': `attachment; filename="${generatedFileName}"`,
    }
  });

  return {
    url: new URL(presignedPost.url),
    form: {
      ...presignedPost.fields,
    }
  }
}
