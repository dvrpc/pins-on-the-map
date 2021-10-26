## Local Development Environment Setup

Create a Python environment with `conda`:

```bash
conda env create -f environment.yml
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
