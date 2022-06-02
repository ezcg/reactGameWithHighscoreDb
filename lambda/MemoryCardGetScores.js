const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    console.log("GET /scores event",event)
    body = await dynamo.scan({ TableName: "HighScoreMemoryCardGame" }).promise();

  } catch (err) {
    console.log("err event",event)
    statusCode = 400;
    body = err.message;
  } finally {
    console.log("finally event",event)
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  }

}