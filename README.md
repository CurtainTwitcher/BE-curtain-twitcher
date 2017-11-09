# Curtain Twitcher (backend)

A restful API for the curtain twitcher app.

You can visit the API and make GET requests at https://curtain-twitcher.herokuapp.com

1. To get all crimes for a specified area:
```
GET /api/crimes?lng=<longitude>&lat=<latitude>
```

2. To get all crime trends for a specified area:

```
GET /api/crimes/trends?lng=<longitude>&lat=<latitude>
```

3. To get all schools for a specified area:
```
GET /api/schools?lng=<longitude>&lat=<latitude>
```

4. Optional queries are:
```
?dis=<distance in miles>
```

## Getting Started

You will need node.js, npm, mongo and mongod installed to run this application locally.

To check you have node.js installed, in the terminal run:

```
node -v
```
If you do not have node installed, see the following [guide](https://nodejs.org/en/download/package-manager/) to help you.

To check you have npm installed, in the terminal run:

```
npm -v
```
If you do not have npm installed, see the following [guide](https://www.npmjs.com/get-npm) to help you.

To check you have mongoDB installed, in the terminal run:

```
npm list mongoose
```
If you do not have mongoDB installed, see the following [guide](https://docs.mongodb.com/manual/installation/) to help you.

### Installing

Clone this repo to your local machine:

```
https://github.com/CurtainTwitcher/BE-curtain-twitcher.git
```

Navigate into the new directory and install dependencies:

```
npm install
```

To seed the database, in a seperate terminal window run ``mongod``.

To run the seed file:

```
npm run seed:development
```


## Running the tests

To run the tests, in the terminal run:

```
npm test
```

## Built With

* [Node.JS](https://nodejs.org/en/) - The enviroment used
* [MongoDB](https://docs.mongodb.com/manual/) - Database Management

## Authors

* **Harry Crank**
* **Oliver Theabould**

See the entire project at [Curtain Twitcher](https://github.com/CurtainTwitcher) who participated in this project.
