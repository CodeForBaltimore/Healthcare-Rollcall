#!/bin/bash

BACKEND=./backend/node_modules
FRONTEND=./frontend/node_modules

# if node modules folder exists in backend & frontend then build 
if [ -d "$BACKEND" ] && [ -d "$FRONTEND" ]
then echo 'running docker-compose up' && docker-compose up

# if backend node_modules exists & frontend does not then npm install frontend then build	
elif [ -d "$BACKEND" ] && [ ! -d "$FRONTEND" ]
then echo 'missing frontend node modules, running npm install' &&
 cd ./frontend && 
 npm install && 
 cd .. && 
 echo 'running docker-compose up' &&
 docker-compose up 

# if frontend node_modules exists & backend does not then npm install backend then build
elif [ ! -d "$BACKEND" ] && [ -d "$FRONTEND" ]
then echo 'missing backend node modules, running npm install' &&
 cd ./backend &&
 npm install &&
 cd .. &&
 echo 'running docker-compose up' &&
 docker-compose up 

# if neither node_modules exist then npm install both then build
elif [ ! -d "$BACKEND" ] && [ ! -d "$FRONTEND" ]
then echo 'missing backend & frontend node modules, running npm install in backend' &&
 cd ./backend && 
 npm install &&
 cd .. &&
 cd ./frontend &&
 echo 'running npm install in frontend' &&
 npm install &&
 cd .. &&
 echo 'running docker-compose up' &&
 docker-compose up

else echo 'Alternative issue, diagnose error'
fi

