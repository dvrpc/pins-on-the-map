# Configuration

A few environment variables are required to make this codebase work, defined through a `.env` file or any other process that declares variables that Python can hook into via `os.getenv()`.

The required variables include:

- `SECRET_KEY` (for Django)
- `DATABASE_URL` (pointing to your PostGIS database)
- `TAG_1`, `TAG_2`, etc., optionally up to `TAG_10`

## Sample `.env` file

```
SECRET_KEY=something-secret

DATABASE_URL=postgresql://postgres:your-password@your-host:5432/database_name

TAG_1=Bicycle
TAG_2=Pedestrian
TAG_3=Transit
TAG_4=Speeding
TAG_5=Visibility
TAG_6=Access/ADA
TAG_7=Maintenance
TAG_8=Traffic
TAG_9=Parking
TAG_10=Wayfinding
```
