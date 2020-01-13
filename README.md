Pickle is tool that allow you to build and manage collaboratively your tests scenarios with the Gherkin syntax. 

A demo is available on : https://pickle.prodgie.tech

You can follow the project on : https://tree.taiga.io/project/sraime-pickle/kanban

### Key Features : 
- Writing a feature's test suite (WIP - Next Release)
- Exporting your feature in a .feature file (WIP - Next Release)
- Collaborative scenario writing (coming soon)

### Environnement's URLs : 
|Local Environnement|Backend URL          |Frontend URL         |
|-------------------|---------------------|---------------------|
|dev                |http://localhost:3000|http://localhost:4200|
|test               |http://localhost:3001|http://localhost:4201|
|prod               |http://localhost:3000|http://localhost:4200|

## Installation

Before all, clone the project with the ```git clone``` command or download the source directory (and unzip it) from [the github project](https://github.com/Sraime/pickle). 

### Dev environnement (with Docker)

This installation assume that you have [docker](https://www.docker.com/) installed on your machine.

This environnement is reserved for developers for writing code, execute unit and integration tests. Note that this environnement will run backend, frontend and database. If you want to run only one of them, you should stop unnecessary containers or run it without docker (next section).

Open a terminal and browse to the project's folder. Then execute the command :
```
docker-compose up
```

It will build and create 3 containers :
- pickle_back_dev : run the backend with nodemon. So you can modify the code without rebuild the container.
- pickle_front_dev : run the frontend with ng serve. So you can modify the code without rebuild the container.
- pickle_mongo_dev : run a database instance of mongodb.

### Dev environnement (without Docker)

This installation assume that you have [node](https://nodejs.org/en/) installed on your machine.

Open a terminal and browse to the project folder.

### Database installation
It's up to you. You can use a [dockerised version](https://hub.docker.com/_/mongo) of mongodb or [install it on your machine](https://www.mongodb.com/fr).

### Backend intallation
1) Browse to the ```back/```folder.
2) Execute ```npm install``` to install all dependencies (dev + prod).
3) Excute ```npm run start:dev``` to run the application.

You can configure the database access with environnement variables (AUTH_SECRET, DB_HOST, DB_PORT, DB_NAME) or modify the config file ```back/config.js```.

### Frontend intallation
1) Browse to the ```front/```folder.
2) Execute ```npm install``` to install all dependencies (dev + prod).
3) Excute ```npm run start:dev``` to run the application.

### Test environnement (with Docker)

This installation assume that you have [docker](https://www.docker.com/) installed on your machine.

This environnement is reserved for executing end to end tests and be sure that every modules of the application work together. It's also possible to setup a mongodb testing data set in the generated ```data/test``` folder.

Open a terminal and browse to the project folder. Then execute the command :
```
docker-compose --file docker-compose.test.yml up
```

It will build and create 3 containers :
- pickle_back_test : run the backend with nodemon. So you can modify the code without rebuild the container.
- pickle_front_test : run the frontend with ng serve. So you can modify the code without rebuild the container.
- pickle_mongo_test : run a database instance of mongodb.

#### Executing tests (End To End)

Tests are not dockerised, so you have to setup the project manualy. To do this :
1) Open a terminal.
2) Browse to the ```test/``` folder.
3) execute the following command to install npm dependencies : ```npm install```.

Then you can run all tests with :
```
npm run test:e2e
```

Or run tagged tests with :
```
npm run test:e2e:tag TestTag
```

### Test environnement (without Docker)

Same as the Dev environnement (witout docker) installation. The only difference is the running command : ```npm run start:test```.

Then you can execute tests as it explained in the previous section.

### Production environnement (with Docker)

This software is dockerised but, to avoid security issues, it's hightly recommanded to not use the provided docker-compose.prop.yml in production. This config should only be use to be sure that the compiled version of the application work correctly.
As the test environnement, it's possible to setup a mongodb data set in the generated ```data/prod``` folder.

To use this environnement you need to compile the frontend part of the application (Angular). To do this you have to execute the  ```ng build``` command in the ```front/```folder. Two ways to to do this :
- directly from your local environnement if you installed the frontend *without docker*.
- inside the ```docker_front_dev``` or ```docker_front_dev``` instance if you installed the frontend *whith docker*.

Now you can open a terminal and browse to the project's folder. Then execute the command :
```
docker-compose --file docker-compose.prod.yml up
```

It will build and create 3 containers :
- pickle_back_prod : install the backend part of the project in production mode and run it with node.
- pickle_front_prod : hosting the compiled version of the frontend (located in the ```dist/ngCliWebpackSample``` folder) in a httpd container.
- pickle_mongo_prod : running a database instance of mongodb.