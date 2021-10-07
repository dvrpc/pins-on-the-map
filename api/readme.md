# api

## Current Features

### GET

Public routes include:

- `/api/get-pins`

Routes that require authentication include:

- `/api/users`
- `/api/groups`

### POST

- `/api/add-pin` will add a pin to the map. It currently requires one argument, `geom`. As an example: `http --form POST http://localhost:8000/api/add-pin/ geom="SRID=4326;POINT (-75.164 39.953)" `

## Future Features

to do
