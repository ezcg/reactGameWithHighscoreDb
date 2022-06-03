const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };


  let userId = decodeURIComponent(event.user_id)
  console.log("GET /score/{user_id} event", event, "userId", userId)
  try {
    body = await dynamo
      .get({
        TableName: "---YOUR_DYNAMODB_TABLE_NAME---",
        Key: {
          userId: userId
        }
      })
      .promise();
  } catch (err) {
    console.log("err event",event)
    statusCode = 400;
    body = err.message;
  } finally {
    console.log("finally body", body)
    let finalBody = {}
    if (typeof body.Item === 'undefined' || typeof body.Item.score === 'undefined') {
      finalBody.score = 0
    } else {
      finalBody.score = body.Item.score
    }
    //body = JSON.stringify(body);
    console.log("finally finalBody", finalBody)
    body = finalBody
  }

  return {
    statusCode,
    body,
    headers
  }

}