
# Chat App API Documentation 

### Introduction

This document will guide you through the process of creating an application using the ChatApp Api. The Document is arranged in two distinct sections, namely -  

* Structure - Understand how the code is arranged in order to modify it
* Endpoints - Use the provided Endpoints in your own application

### Structure
#### Introduction

This section will help you get starting with extending the API by explaining the design patterns and the function of each directory.

#### File Structure

	/backend
	 - routes
	 - models
	 - middlewares
	 - utils
	 - socket.js
	 - index.js

#### Routes
This folder contains the files for the routes middlewares.

#### Middlewares
Here's where all the custom middlewares are kept

#### Utils
This directory is meant to store small one off functions, such as the function which generates and verifies the jwt token.
#### Socket.js
This file is responsible managing all the socket connections.
### Endpoints

#### Endpoint URI : /users

##### Search or List Users
```
// Resource URL : /
// Searches the users based upon the query if it's empty just a list of users is passed
	
METHOD: GET
HEADERS: Content-Type -> application/json
QUERYPARAMS: search
BODY: null
RETURNS: {
	[users]
}
```
##### Register New User
```
// Resource URL : /register
// Creates a new User
	
METHOD: POST
HEADERS: Content-Type -> application/json
QUERYPARAMS: null
BODY: {
	username,
	password,
	first_name,
	last_name,
	nickname,
	profile_pic,
	header_pic,
	dob,
	phone,
	bio
}
RETURNS: {
	success : true | false
}
```
##### Login User
```
// Resource URL : /login
// Generates and return a jwt token which can be passed as a bearer token
	
METHOD: POST
HEADERS: Content-Type -> application/json
QUERYPARAMS: null
BODY: {
	username,
	password
}
RETURNS: {
	success : true | false
}
```
##### Forgot Password
```
// Resource URL : /forgotpassword
// Sends an E-email containing the link to reset the password
	
METHOD: POST
HEADERS: Content-Type -> application/json
QUERYPARAMS: null
BODY: {
	username
}
RETURNS: {
	success : true | false
}
```
##### Reset Password
```
// Resource URL : /resetpassword
// Sets the Password
	
METHOD: POST
HEADERS: Content-Type -> application/json
QUERYPARAMS: null
BODY: {
	password
}
RETURNS: {
	success : true | false
}
```