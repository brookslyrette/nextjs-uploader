## Environment variables


### Required

`UPLOADER_AWS_ACCESS_KEY_ID`: An AWS access key used to write and read files on S3

`UPLOADER_AWS_SECRET_ACCESS_KEY`: An AWS secret access key used to write and read files on S3

`UPLOADER_AWS_S3_BUCKET`: The name of the AWS bucket where files are written

`NEXTAUTH_SECRET`: Secret token used to encrypt JWT.

`NEXTAUTH_URL`: The url the application is deployed on.

### Optional for development, required for production.

`CUSTOMER_PASSWORD`: The password for the customer account.

`SUPPORT_PASSWORD`: The password for the support account.

# Architecture

## Framework

This application uses `next.js` for its front end as well as its API.

## Authentication

Authentication is implemented using `next-auth`. Since this is a demo it uses a fixed array of user accounts. The JWT token is saved in a cooked called `__Secure-next-auth.session-token`. Authentication is checked when pages are loaded and on API calls.

I decided to use `next-auth` due to its flexibility. It implements a wide variety of specs including oAuth and custom credentials. This is my first time using this framework and I'd use it again in the future.

## API

The API is implemented with `next.js` API Routes. All calls are secured with `next-auth`. All API endpoints call into a `service` to ensure we have the proper separation of concerns. Code in `api` should only deal with parsing the request and returning a response.



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

## Services

There is one service in this application with the following interface:

*Storage:* A service for storing, listing and retrieving files. This specific implementation is for Amazon's S3.

`getFiles(): Promise<FileList>`

`getFile(filename: string): Promise<URL>`

`getUploadURL(filename: string): Promise<FileUploadDetails>`

This approach isolates all the code related to `S3` in a single place.

## Storage

All files are stored `S3`. Files are uploaded using secure signed URLs. This allows us to upload the file directly from the end-user to S3 in a secure manner. Files are downloaded using secure signed URLs that expire. The application appends a random integer to all file names to minimize the odds of having a naming collision.

## Styling

This app uses `tailwindcss` for application styling.

## CI/CD

CI uses GitHub actions to check out the code, run `npm ci` and run the test suite.

CD is via `vercel`. Any changes merged into `main` will be automatically deployed to production. Every branch will have a demo deployment. This makes it really easy to share a work in progress with others.

*Note:* The S3 bucket only allows `CORS` requests from `http://localhost:3000` and `https://nextjs-uploader-git-main-brookslyrette.vercel.app/. To test other branches we'd need more permissive permissions on the bucket.

![Screen Shot 2022-05-05 at 10 56 24 AM](https://user-images.githubusercontent.com/1881100/166952047-1626b0ee-cf16-46e8-8d32-c1a9068a16dd.png)

![Screen Shot 2022-05-05 at 10 58 25 AM](https://user-images.githubusercontent.com/1881100/166952248-35a9d487-c3b5-4754-b7e4-c4191193ef7f.png)

## Logging/Metrics

App logs and API logs are accessible in `vercel`. Metrics could be enabled with a paid free `vercel` account. If this app was going to a real production environment it would also need client-side RUM (real user metrics) and error reporting.

## Demo Deployment

https://nextjs-uploader-git-main-brookslyrette.vercel.app/

## Getting Started

*Note: ensure you've set all the required `ENV` vars in your environment*

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
