# Team ETIS
Headless CMS


## Install the dependencies
```bash
yarn
# or
npm install
```


### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Run the mock database
```bash
node server.js

# The mock database runs on port 3000 and all requests to it are temporarily
# hard-coded to be sent to port 3000 for testing purposes. Be careful when
# running simultaneously with API running on port 3000.
```


### Lint and fix the files
```bash
yarn lint
# or
npm run lint
```


### Build the app for production
```bash
quasar build
```
