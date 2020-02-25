# Share Space Back-end Server

Back-end server for the Share Space project.


## Used Programs

* Node.js
* TypeScript
* Express
* MySQL


## Web API

Uses REST API.


### /user


#### POST /user/token

Check login and create token.

* Request Body JSON
```json
{
  "email": "string", 
  "pw": "string"
}
```

* Response JSON
```json
{
  "auth": "boolean", 
  "token": "string"
}
```


#### GET /user

Login.

* Request Header
```
token : string
```

* Response JSON
```json
{
  "auth": "boolean",
  "id": "number",
  "email": "string",
  "name": "string"
}
```


#### POST /user

Sign up.

* Request Body JSON
```json
{
  "email": "string",
  "pw": "string",
  "name": "string"
}
```

* Response JSON
```json
{
  "result": "boolean"
}
```


#### GET /user/data/:id

Get user data.

* Request Param
```
id : number
```

* Response JSON
```json
{
  "result": "boolean",
  "name": "string"
}
```


### /post


#### POST /post

Write new post.

* Request Header
```
token : string
```

* Request Body JSON
```json
{
  "text": "string",
  "image": "array"
}
```

* Response JSON
```json
{
  "auth": "boolean", 
  "result": "boolean"
}
```
