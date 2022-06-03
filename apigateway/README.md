# Before creating Resources/Methods, do:

* Click on Models in the sidebar, add scoreModel.json and name it 'score'.
* Click on Authorizers in the sidebar and add an Authorizer. Select Cognito as the authorizer and add the user pool you created in Cognito. 

# Creating the /score POST method

Actions -> select Create Resource
For Resource Name enter: score
For Resource Path leave the auto-entered value of score
Click on Create Resource
Click on the /score resource that was just created and click on Actions -> select Create Method. Select POST and click the checkmark.

**Method Request** 

    Next to 'Authorization', add the authorizer you created above.
    Under Request Body, click on '+ Add Model' and add the 'score' model and set 'Content type' to application/json.
    
**Method Integration** 

    Integration type is 'Lambda Function'
    Lambda region is the region the lambdas are in.
    Lambda function is MemoryCardPostScore.
    Mapping Templates
        For 'Request body passthrough', select 'When there are no templates defined'.
        Add a mapping template and set Content-Type to application/json
        Copy and paste the contents of apigateway/score-POST-integration_request_mapping_template.json into the text field and save.

**Method Response**

    Add a 401 HTTP status.

**Integration Response**

    Paste into the Lambda Error Regex field: .*unauthorized.*
    For Method response status, select 400 from the drop down menu.
    Save.

# Creating the /score GET method

    Click on the /score resource, leaving it highlighted
    Actions -> select Create Resource
    For Resource Name enter: user_id
    For Resource Path enter: {user_id}
    Click on Create Resource
    Click on the /score resource that was just created and click on Actions -> select Create Method. Select GET and click the checkmark.

**Method Request**

    Next to 'Authorization', add the authorizer you created.

**Method Integration**

    Integration type is 'Lambda Function'
    Lambda region is the region the lambdas are in.
    Lambda function is MemoryCardPostScore.
    Mapping Templates
        For 'Request body passthrough', select 'When there are no templates defined'.
        Add a mapping template and set Content-Type to application/json
        Copy and paste the contents of apigateway/score-POST-integration_request_mapping_template.json into the text field and save.

**Method Response**

    Add a 401 HTTP status.

**Integration Response**

    Paste into the Lambda Error Regex field: .*unauthorized.*
    For Method response status, select 400 from the drop down menu.
    Save.

Once that is done, select Actions -> Deploy API
Create a stage if need be. (eg. dev, prod, demo, test)
Once it deploys, you'll be redirected to Stages. Click on the stage you just deployed.
Click on the tab labeled SDK Generation.
From the Platform drop down, select Javascript. It will automatically download. Extract the apiGateway-js-sdk directory from the zip file. Remove public/js/apiGateway-js-sdk/ directory.
Put the new apiGateway-js-sdk you just unzipped into public/js/