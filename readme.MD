# React-Kanban

Skeleton app for building a SPA with React, using Webpack with JSX loader as bundler. Webpack works better than plain webmake because it parses any `.js` file with JSX loader, so any JSX code is converted to Javascript in memory, on the fly.

It also uses SASS for styles. All `.scss` files are located in `./styles`.

## Dependencies

1. Webpack. Install with `sudo npm install -g webpack`.
2. Sass command-line tool (depends on Ruby) if you want `.scss` bundling.

## Available npm commands:

1. `npm run build` 
Will build everything (SASS + JSX + CommonJS bundle).

2. `npm run dev` 
Used for development, it watches all `sass` and `js` files, rebuilds on changes, and starts simple local server at localhost:8080. Live reload not implemented, you'll have to refresh your app upon changes.