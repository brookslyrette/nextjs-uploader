## Environment variables

`UPLOADER_AWS_ACCESS_KEY_ID`: An AWS access key used to write and read files on S3

`UPLOADER_AWS_SECRET_ACCESS_KEY`: An AWS secret access key used to write and read files on S3

`UPLOADER_AWS_S3_BUCKET`: The name of the AWS bucket where files are written

`NEXTAUTH_SECRET`: Secret token used to encrypt JWT.

`NEXTAUTH_URL`: The url the application is deployed on.

`CUSTOMER_PASSWORD`: The password for the customer account.

`SUPPORT_PASSWORD`: The password for the support account.


## API

### `POST /api/storage/upload`: Returns URL and form parameters to upload a file.

Response:

```
{
  "url": "https://upload-path",
  "form": {
    "Content-Disposition": "attachment; filename=\"test_file.2352286481.tar.tgz\"",
    "bucket": "bucketname",
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": "Example",
    "X-Amz-Date": "20220503T135140Z",
    "key": "test_file.2352286481.tar.tgz",
    "Policy": "key"
  }
}
```

Errors:

`400 Bad Request`: Request parameters are missing.

`401 Unauthorized`: Request is unauthenticated

`403 Forbidden`: User is logged in but is not in the 'customer' role

`405 Not Allowed`: Unexpected HTTP method

`500 Internal Server Error`: Server side error, check application logs.


### `GET /api/storage/download`

Response: `302 Redirect` to a signed S3 url

Errors:

`400 Bad Request`: Request parameters are missing.

`401 Unauthorized`: Request is unauthenticated

`403 Forbidden`: User is logged in but is not in the 'support' role

`405 Not Allowed`: Unexpected HTTP method

`500 Internal Server Error`: Server side error, check application logs.



### `GET /api/storage/list`

Response:

```
[
  {
    "name": "test_file.tar.tgz",
    "size": 0,
    "lastModified": "2022-05-02T13:31:02.000Z"
  }
  ...
]
```

Errors:

`400 Bad Request`: Request parameters are missing.

`401 Unauthorized`: Request is unauthenticated

`403 Forbidden`: User is logged in but is not in the 'support' role

`405 Not Allowed`: Unexpected HTTP method

`500 Internal Server Error`: Server side error, check application logs.

## Demo Deployment

https://nextjs-uploader-git-main-brookslyrette.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
