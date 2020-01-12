#!/bin/bash

cd /pickle_back
if [ $NODE_ENV = dev ]
then
    npm install
else
    npm install --only=prod
fi
npm start