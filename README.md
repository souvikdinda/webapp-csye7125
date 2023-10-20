# # WEBAPP project
**_This project contains RESTful Web Application that allows Users to create multiple products and each product can have multiple images_**

## Web Application:
> Technologies Used: NodeJS, ExpressJS, Sequelize ORM
> Database: MySQL
> Libraries Used: Bcrypt (password encryption), dotenv, mysql2, chai & mocha (testing), aws-sdk, multer (middleware for uploading files), statsd (monitoring), winston (logging)

_This application can be hosted on AWS **EC2**, MySQL on **RDS**, **S3** bucket to store images, **Cloudwatch** to view monitoring metrics and application logs

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

**_User Data_**
**GET** https://{domainName}/v1/user/{userId} 
    *Note: Username, Password is required for authentication*

**POST** https://{domainName}/v1/user 
    *first_name, last_name, password, username is expected in payload*

**PUT** https://{domainName}/v1/user/{userId}
    *first_name, last_name, password can be updated*


## Continuous Integration

_**Github Actions** has been used for CI pipeline that verifies the code being merged (by running unit and integration tests) and creates image of the new code using **Packer** which is then made available as **AMI** in AWS across DEV and PROD accounts_



This project is part of coursework for **CSYE 7125**

_Author: Souvik Dinda_
