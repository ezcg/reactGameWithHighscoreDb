/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://55hoqs7yf5.execute-api.us-east-1.amazonaws.com/prod';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient =window.apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.scorePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
       window.apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var scorePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent +window.uritemplate('/score').expand(window.apiGateway.core.utils.parseParametersToObject(params, [])),
            headers:window.apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams:window.apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(scorePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.scoreOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
       window.apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var scoreOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent +window.uritemplate('/score').expand(window.apiGateway.core.utils.parseParametersToObject(params, [])),
            headers:window.apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams:window.apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(scoreOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.scoreUserIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
       window.apiGateway.core.utils.assertParametersDefined(params, ['user_id'], ['body']);
        
        var scoreUserIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent +window.uritemplate('/score/{user_id}').expand(window.apiGateway.core.utils.parseParametersToObject(params, ['user_id'])),
            headers:window.apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams:window.apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(scoreUserIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.scoreUserIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
       window.apiGateway.core.utils.assertParametersDefined(params, ['user_id'], ['body']);
        
        var scoreUserIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent +window.uritemplate('/score/{user_id}').expand(window.apiGateway.core.utils.parseParametersToObject(params, ['user_id'])),
            headers:window.apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams:window.apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(scoreUserIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.scoresGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
       window.apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var scoresGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent +window.uritemplate('/scores').expand(window.apiGateway.core.utils.parseParametersToObject(params, [])),
            headers:window.apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams:window.apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(scoresGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.scoresOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
       window.apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var scoresOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + window.uritemplate('/scores').expand(window.apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: window.apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams:window.apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(scoresOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};