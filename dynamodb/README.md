https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools

Create table

Give it a name like HighScores

The Partition key is case sensitive and must be: userId

Create table

It will cost money so delete it when done or explore 'Customize Settings' to make it cheaper.

Update the Lamba's with that table name and update the IAM policies with that table name. Search through the files for ---YOUR_DYNAMODB_TABLE_NAME--- to make sure you replaced them all.




