# Front end

## HTML

This is a single-page application, with the HTML file being stored
at `/templates/landing_page.html`

## JavaScript

The main JS entrypoint is `/assets/index.js`. All other JS files can be found under `/assets/js`. These files are minified and bundled by webpack and the HTML file loads the webpack output from `/static/index-bundle.js`

## CSS

CSS files can be found under `/assets/css`, and webpack bundles and minifies the files. The HTML page loads the CSS from `/static/main.css`

## Images

All images can be found under `/static/images`
