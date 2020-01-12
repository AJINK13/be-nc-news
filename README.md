# News Concept API

## Summary

A backend project showcasing the concept of a RESTful API for mock Reddit style forum.

The project has been built using Express web framework and PostgreSQL database.

Project is supplied with a test and a development databse with the development database also being used for the production version.

The API has been hosted on Heroku and can be found here: https://news-website-aj.herokuapp.com/api

## Getting Started

The following instructions will allow you to copy and run the project for your own purposes.

### Prerequisites

You will need the following

- Node.js v12.x.x
- npm v6.x.x
- PostgreSQL (AKA PSQL)

#### Installing Prerequisites

- [Node.js download and documentation can be found here. Note that npm is packaged with Node.js](https://nodejs.org/en/)
- [PostgreSQL download and documentation can be found here](https://www.postgresql.org/)

## Installing

1. Clone the project to your local machine. Optionally you can fork the project and then clone.

> git clone `https://github.com/AJINK13/be-nc-news.git`

2. Install dependencies

> npm install

3. Set up database

> npm run setup-dbs

4. Seed database for development

> npm run seed-dev

5. Start the app locally

> npm start

The API will now be running on http://localhost:9090/

Note that the above following commands can be found in package.json under scripts.

## Dependencies

The following have been used for the development and running of the application:

- [Express](https://expressjs.com/): Web application framework for Node.js.
- [PostgreSQL](https://www.postgresql.org/): Open source relational database
- [Knex.js](https://knexjs.org/): Node.js query builder for relational databases
- [Mocha](https://mochajs.org/): Testing framework which is used for unit and integration testing
- [Chai](https://www.chaijs.com/): Assertion library
- [Chai-Sorted](https://www.chaijs.com/plugins/chai-sorted/): Extension of Chai which allows for testing if an array has sorted values
- [Supertest](https://github.com/visionmedia/supertest): Testing HTTP servers
- [cors](https://github.com/expressjs/cors): Used to enable CORS with various options. More information regarding CORS can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Endpoints

The endpoints can be found in endpoints.json.

## Testing

The API has been developed with test-driven development (TDD).

- To test the utility functions which are found under /db/utils/utils.js

> npm run test-utils

- To test the API

> npm run test-app

- Alternatively, you can test the entire application

> npm test
