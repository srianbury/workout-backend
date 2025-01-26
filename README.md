# workout-backend

backend service for [https://platphorm.vercel.app/](https://platphorm.vercel.app/)

## Running locally

### Running the database and service

1. `docker compose -f docker-compose-database.yml up -d` to start the mongo database

- With this running, you can visit mongo-express at `http://localhost:8081/`
- In this tool, you can create, view, update, and delete the database(s) and collection(s)

2. `docker compose -f docker-compose-backend.yml build && docker compose -f docker-compose-backend.yml up` to build and start the backend service

- With this running, you can visit the backend service at `http://localhost:8000/graphql`

### Running a production build locally

1. `docker compose -f docker-compose-backend-prod.yml up --build`

### Getting development data

1. export from prod
   a. For every collection, run `mongoexport --uri mongodb+srv://<username>:<password>@<your-db-domain>/<db-name> --collection users --out local-db-data`
2. Since the import from mongoexport is broken on mongo express, we need to do a work around to import the data
   a. `docker cp local-db-data/ workout-app-local-mongodb:/local-db-data`
   b. `docker exec -it workout-app-local-mongodb it`
   c. `cd local-db-data`
   b. `mongoimport --authenticationDatabase admin --username=root --password=example -d test -c users test-users.json`
   b. `mongoimport --authenticationDatabase admin --username=root --password=example -d test -c posts test-posts.json`
   b. `mongoimport --authenticationDatabase admin --username=root --password=example -d test -c userfavorites test-userfavorites.json`
   b. `mongoimport --authenticationDatabase admin --username=root --password=example -d test -c postfavoritedbies test-postfavoritedbies.json`
