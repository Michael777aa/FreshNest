#!/bin/bash

# PRODUCTION

# git reset --hard
# git pull origin master

npm i 
npm run build 
pm2 start process.config.js --env production


#DEVELOPMENT
# git rest --hard 
# git checkout develop
# git pull origin develop


# npm i
# pm2 start "npm run start:prod" --name=FreshNest