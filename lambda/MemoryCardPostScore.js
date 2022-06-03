const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let doSave = true
  let statusCode = 200
  let scoreDb = 0
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    console.log("POST /score event", event)
    let userId = event.user_id
    let score = parseInt(event.score)
    console.log("userId:", userId, "score:", score)

    // START get existing score
    try {
      let r = await dynamo
        .get({
          TableName: "---YOUR_DYNAMODB_TABLE_NAME---",
          Key: {
            userId: userId
          }
        }).promise();
      console.log("r", r)

      if (typeof r.Item.score !== 'undefined') {
        scoreDb = parseInt(r.Item.score)
      }
      console.log("scoreDb:", scoreDb, "score:", score)
      if (scoreDb >= score) {
        statusCode = 400;
        body = "For user " + userId + ", the submitted score of " + score + " is not greater than the score in the database: " + scoreDb
        doSave = false
      }
    } catch (err) {
      console.log("err event",event)
      body = err.message;
    }
    // END get existing score

    if (doSave === false) {
      console.log("doSave is false body:", body)
      return {
        statusCode,
        body,
        headers
      }
    }

    await dynamo
      .put({
        TableName: "---YOUR_DYNAMODB_TABLE_NAME---",
        Item: {
          userId: userId,
          score: score
        }
      }).promise();
    body = "Saved score: " + score
  } catch (err) {
    console.log("err event",event)
    statusCode = 400;
    body = err.message
  } finally {
    console.log("finally event",event)
  }
  console.log("response body", body)
  return {
    statusCode,
    body,
    headers
  }

}