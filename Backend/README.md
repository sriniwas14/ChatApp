# NodeJS_Express_API_Boilerplate
An Express RestAPI Boilerplace with JWT Based User Creation and Authentication

## Introduction
As the name implies this application is a boilerplace that I use to get started with creating an API for my Web Applications

## Features
* User Account Creation
* Login With JWT
* Forgot Password with SMTP sendmail

## Getting Started
To get started create a mysql database and populate that with the `databaseSchema` that is provided in this repo.

For setting up the environment variables you can rename the provided `envSample` file to `.env` and then modify it according to your needs.


## Environment Variables
This section provides an introduction to the environment variables we are using in this application

|Name| Value|
|----|----|
|PORT| The Port on which this app will run on|
|JWT_KEY | The JWT Secret Key|
|JWT_EXPIRATION | For how long will the Key be valid|
| MAIL_USER | SMTP mail username |
| MAIL_PASS | SMTP mail password |
| MAIL_FROM | The name of the account which will appear on the sent email |
| SITE_URL | The URL for the Site it will be hosted on |
| DB_HOST | Hostname for the Database |
| DB_NAME | Name of the Database |
| DB_USER | Username for the Database |
| DB_PASS | Password for the Database | 

## Need Help?

1. [Express JS](https://www.npmjs.com/package/express)
2. [JWT](https://www.npmjs.com/package/jsonwebtoken)
3. [Bcrypt](https://www.npmjs.com/package/bcrypt)
