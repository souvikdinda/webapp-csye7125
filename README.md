# # WEBAPP project
**_This project contains RESTful Web Application that allows Users to create multiple products and each product can have multiple images_**

### Prerequisite to run the application:
*NodeJS*: v20.0.0

### Steps to run application locally:
1. Clone from the repository to local machine
    Command: git clone 'repo-URL'

2. Run below command to install dependencies
    Command: npm install

3. Run below command to start server
    Command: npm run start

### Valid Endpoints:

**_Health Check_**
**GET** https://{domainName}/healthz

**_Http Check_**
**GET** https://{domainName}/v1/http-check/{id} 

**GET ALL** https://{domainName}/v1/http-check/

**POST** https://{domainName}/v1/http-check

**PUT** https://{domainName}/v1/http-check/{id}

**DELETE** https://{domainName}/v1/http-check/{id}


## Continuous Integration

_**Github Actions** has been used for CI pipeline that verifies the code being merged (by running unit and integration tests) and creates image of the new code using **Packer** which is then made available as **AMI** in AWS across DEV and PROD accounts_



This project is part of coursework for **CSYE 7125**

_Author: Souvik Dinda_
