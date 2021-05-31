# X-Lab - Leeds Beer Quest

I chose the back-end focussed version of this challenge. Firstly, I created a Docker container to host a Postgres database, and I configured it to populate the database with the sample data in the CSV. There is one table which I labelled "venues".

`docker-compose up -d` will build the Postgres container. To run the API, run `npm install` to install express and pg, then `npm run start` to kick off server.js. The API runs on port 3000. Of course in theory this could also be dockerized.

As far as the data itself goes, I am using the venue name as a unique ID, which is not ideal since it would be good for each venue to be tied to some unique internal ID.

The way I organized the architecture of this back-end API may seem a little over the top, but the point is to make something that could scale cleanly if we were to add more datasets, more tables, more API endpoints, or even more middleware components. I'm splitting it up into:

-a "storage" folder which contains the actual database queries.

-a "middleware" folder which contains middleware functions (some request validation is done here), and a handler for the main server.js to use.

-a "routes" folder which contains the API endpoints.

-server.js which creates a Postgres pool, creates a handler to relay queries from the API routes to the Postgres pool, and then creates and runs an express server which listens on port 3000.

I didn't have time to get this to 100%, but I hope I made it substantial enough to generate some discussion and speak further. I like doing this type of development.
