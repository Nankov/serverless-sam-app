import { createClient } from 'redis';
const client = createClient({
    url: 'redis://my-el-u0dux558zr9g.xudgds.0001.euc1.cache.amazonaws.com',
    port: 6379
});

export const lambdaHandler = async (event, context) => {
    try {
        client.on('error', err => console.log('Redis Client Error', err));

        await client.connect();

        let cnt = await client.get('counter');
        console.log(`The counter is: ${cnt}`)
        if (cnt) {
            cnt = parseInt(cnt) + 1
            console.log(`Counter in if statement: ${cnt}`)
            await client.set('counter', cnt);
        } else {
            cnt = 1;
            await client.set('counter', cnt);
        }

        await client.disconnect();


        return {
            'statusCode': 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*", // Allow from anywhere 
                "Access-Control-Allow-Methods": "*" // Allow only GET request 
            },
            'body': JSON.stringify({
                message: {
                    "counter": cnt
                },
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};