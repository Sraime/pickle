#!/bin/bash

cd /pickle_back
if [ $NODE_ENV = prod ]
then
    npm install --only=prod
    npm start
else
    npm install
    npm run start:$NODE_ENV
fi