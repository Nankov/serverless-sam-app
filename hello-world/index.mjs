import { S3Client, AbortMultipartUploadCommand, GetObjectCommand } from "@aws-sdk/client-s3";
const client = new S3Client({ region: "eu-central-1" });

export const lambdaHandler = async (event, context) => {
    try {

        const response = await client.send(new GetObjectCommand({
            Bucket: "my-serverless-app-indexbucket-1lp54etaen4rl",
            Key: "index.html"
        }))

        const page = await response.Body.transformToString()

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*", // Allow from anywhere 
                "Access-Control-Allow-Methods": "*", // Allow only GET request 
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/html"
            },
            "body": page,
            "isBase64Encoded": false
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
