https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools

Click on Create 

This demo only uses email to authorize.

Cognito user pool sign-in options
    Check off Email

Click Next

Password policy

    Copy the password requirements you choose and paste the messaging into public/js/config.js

Multi-factor authentication
    
    Select No MFA

User account recovery
    Leave the defaults already selected.

Click Next

Email
    
    Select Send email with Cognito if you don't have a verified identity already set.

User pool name

    Call it "highscoreusers" or whatever you want.

Initial app client

    App client name - name it whatever you want

Attribute read and write permissions

    Check off email and email_verified and leave everything else unchecked.

Review and Create

Copy the User Pool ID and paste it into public/js/config.js

Click on the App Integration tab and scroll down. Copy the Client ID and paste it into public/js/config.js

