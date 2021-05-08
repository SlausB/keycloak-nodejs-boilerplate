#!/bin/bash

LOCAL_USER_ID=`id -u`
export LOCAL_USER_ID
echo "Starting with UID : $LOCAL_USER_ID"

# postgres overwrites files permissions making future builds unable to mount:
if [ -d "./var" ]; then
    sudo chown -R $(id -u):$(id -g) ./var
fi

docker-compose down
docker-compose up --build --force-recreate --remove-orphans --renew-anon-volumes
docker-compose down