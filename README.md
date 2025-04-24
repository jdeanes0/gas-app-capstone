# Jonathan Eanes's Computer Science Capstone Project - \<gas-app\>

This Node.js application is used to compute the most cost-effective station for a particular car from a particular place at a particular time.

# Running

To run, you will first need to create the database in the db folder with sqlite. Name it "app.db". Then, from the database command line, load the schema with `.read schema.sql`

Secondly, you will need to run `npm run scrape` and then `npm run geocode` to gather locations into the database along with their prices from GasBuddy.

Finally, you can run `npm run cli` to start the user-friendly CLI for the app.