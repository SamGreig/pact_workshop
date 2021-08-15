# PACT Testing Workshop

This project includes a Pact Broker along with a simple RESTful API written using Express for Node.js

#### Prerequisites:
You will need *Docker* installed on your system.


> Start the Pact Broker
- Run `docker-compose -f pact_broker/docker-compose.yml up -d`
- To view the Pact broker, open a browser and navigate to `localhost:9292`
####

> Start the Express API
- Run `docker-compose -f api/docker-compose.yml up -d`
- To confirm the application is working, open a browser and navigate to `localhost:3001`
####

> Generating the consumer Pact contract
- Run `npm install` to install the test dependencies.
- Run `npm test` to run the consumer integration tests and generate the Pact file.
- The generated pact file will be published to the broker and can be located at `./pacts`
####

> Testing the provider against the consumer contract
- TODO
####
