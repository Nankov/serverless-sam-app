/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const dbclient = new DynamoDBClient({ region: "eu-central-1" })

export const lambdaHandler = async (event, context) => {
    try {
        console.log(JSON.parse(event.body))

        const body = JSON.parse(event.body)
        
        console.log(body.ID)
        console.log(body.Text)

        const res = await dbclient.send(new PutItemCommand({
            TableName: "my-serverless-app-DDBTable-1PZVXNJFAKQOF",
            Item: {
                "ID": { S: body.ID },
                "Text": { S: body.Text }
            }
        }))

        return {
            'statusCode': 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*", // Allow from anywhere 
                "Access-Control-Allow-Methods": "*" // Allow only GET request 
            },
            'body': JSON.stringify({
                message: res,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
