# Backend

This application uses the Django library in Python to handle all backend functionality.

## Database models

The data models are all declared within `/pins/models.py`. If customizations are needed to the
database, start by modifying the classes defined here.

## API

The read/write functionality that hooks into the database models is defined under `/api`.
These models are serialized into JSON using the classes defined within `/api/serializers.py`. These serializers are then used directly within `/api/urls.py` and/or used in views defined within `/api/views.py`

## Command-line testing of the API

These examples assume you've installed [`httpie`](https://httpie.io/cli).

### GET data

#### Get all pins on the map as GeoJSON

```bash
http :8000/api/get-pins/
```

#### Get a list of all tags defined by ID as JSON

```bash
http :8000/api/tags/
```

#### Get all pins that have a specific tag as GeoJSON

In this example, get all pins where TAG_1 is True

```bash
http GET :8000/api/filter-pins/ tag_1==True
```

### PUT data

#### Add a pin to the database

In this example, a specific lat/lng, text message, and tag selections are being passed to the API.

```bash
http --form POST :8000/api/add-pin/ geom="SRID=4326;POINT(-75.164 39.953)" prompt_1="There are potholes in the street here" tag_5=True tag_6=True
```

#### Add a comment to the database

Adding a comment to the database requires values for `text` and `pin_id`

```bash
http --form POST :8000/api/add-comment/ text="I agree that this is an issue" pin_id=70
```

#### Add user's survey info to the database

Users can answer up to 5 questions, all of which are optional.

```bash
http --form POST :8000/api/add-user-info/ q1="yes" q2="no"
```
