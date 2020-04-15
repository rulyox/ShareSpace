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
  "result": "number",
  "message": "string",
  "token": "string"
}
```

* Result Code
```
101 : OK
201 : Wrong email or password
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
  "result": "number",
  "message": "string"
}
```

* Result Code
```
101 : OK
201 : Email exists
```

#### POST /user/image

Add profile image.

* Request Header
```
token : string
```

* Request Form
```
files
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

* Request Form
```
text : string
files
```

* Response JSON
```json
{
  "postId": "number"
}
```

## Configuration

Save these JSON files in `/config`.

### server.json
```json
{
  "port": 8080,
  "aes": "32byte AES key"
}
```

### db.json
```json
{
  "host": "MySQL host",
  "port": 3306,
  "user": "MySQL user name",
  "pw": "MySQL password",
  "name": "MySQL database name"
}
```

### data.json
```json
{
  "imagePath": "directory to save images"
}
```
