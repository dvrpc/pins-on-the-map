# pins-on-the-map

Crowdsourcing web application that collects community feedback for planning projects

## Tech Stack

This application is built with Python (`Django 3.2.8`) and JavaScript (`MapboxGL 2.4`), with an external dependecy on PostgreSQL (`PostGIS 3.1`).

## Live Demo

can be found at [https://pins-on-the-map.dev.dvrpc.org/](https://pins-on-the-map.dev.dvrpc.org/)

## Local Development Environment Setup

Create a Python environment with `conda`:

```bash
conda env create -f environment.yml
```

Create a `.env` file with two values:

```
SECRET_KEY=something-secret
DATABASE_URL=postgresql://postgres:your-password@your-host:5432/database_name
```

Install the JavaScript dependencies:

```bash
npm install
```

## Run the Dev Server

### Backend

In your terminal, activate the Python environment:

```bash
conda activate pins-on-the-map
```

then run the Django app:

```bash
python manage.py runserver
```

### Frontend

In another terminal, run:

```bash
npm run dev
```

and then visit [http://localhost:8000/](http://localhost:8000/) in your browser.
