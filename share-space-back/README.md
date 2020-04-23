# Share Space Back-end Server

Back-end server for the Share Space project.

## Used Programs

* Node.js
* TypeScript
* Express
* MySQL

## Web API

[API Document](./API.md)

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
  "imageDir": "directory to save images"
}
```
