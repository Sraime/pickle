#!/bin/bash

cd /pickle_front
if [ $NODE_ENV = test ]
then
    npm install
    npm run start:test
else
    npm install
    npm run start:dev
fi